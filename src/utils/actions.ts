"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./script";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { randomUUID } from "crypto";
import { Campaign } from "@prisma/client";
import { ECampaignStatus, ETweetStatus } from "./enums";
import { z } from "zod";

// CAMPAIGN ACTIONS
export const createCampaign = async (formData: any) => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const campaign: Campaign = {
    id: randomUUID(),
    userId,
    status: ECampaignStatus.ACTIVE,
    updatedAt: new Date(),
    createdAt: new Date(),
    ...formData,
  };

  try {
    const response = await prisma.campaign.create({
      data: campaign,
    });

    revalidatePath("/campaigns");
    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const updateCampaign = async (formData: any, campaignId: string) => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const response = await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        ...formData,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/campaigns");
    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const getCampaignsWithTweets = async () => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const campaignsWithTweets = await prisma.campaign.findMany({
      include: {
        tweets: true,
      },
      where: {
        userId,
        status: ECampaignStatus.ACTIVE,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Return response with type
    return campaignsWithTweets;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const deleteCampaign = async (campaignId: string) => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const response = await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        status: ECampaignStatus.DELETED,
      },
    });

    await prisma.tweets.updateMany({
      where: {
        campaignId,
      },
      data: {
        status: ETweetStatus.DELETED,
      },
    });
    revalidatePath("/campaigns");
    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// TWEET ACTIONS
export const createTweet = async (formData: any) => {
  const { campaignId, content, status, date, time } = Object.fromEntries(
    formData.entries()
  );

  const Tweet = z.object({
    campaignId: z.string(),
    content: z.string(),
    status: z.number(),
    date: z.string(),
    time: z.string(),
  });

  const scheduledAt = new Date(`${date}T${time}:00`).toISOString();

  //   const validatedFields = Tweet.safeParse({
  //     campaignId,
  //     content,
  //     status,
  //     date,
  //     time,
  //   });

  //   console.log(validatedFields);
  //   if (!validatedFields.success) {
  //     console.log("ERROR: Invalid fields");
  //     return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  //   }

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const response = await prisma.tweets.create({
      data: {
        id: randomUUID(),
        campaignId,
        content,
        status: 1,
        scheduledAt,
        userId,
      },
    });

    revalidatePath(`/campaigns/${campaignId}`);
    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const getActiveTweets = async () => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const tweets = await prisma.tweets.findMany({
      where: {
        userId,
        status: ETweetStatus.ACTIVE && ETweetStatus.SENT,
      },
      include: {
        campaign: {
          select: {
            name: true,
          },
        },
      },
    });

    return tweets;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const getDrafts = async () => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const drafts = await prisma.tweets.findMany({
      where: {
        userId,
        status: ETweetStatus.DRAFT,
      },
      include: {
        campaign: {
          select: {
            name: true,
          },
        },
      },
    });

    return drafts;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// USER ACTIONS
export const createUser = async (userData: any) => {
  const { id, username, email } = userData;

  try {
    const response = await prisma.user.create({
      data: {
        id,
        email,
        username,
      },
    });
    console.log("User created", id);
    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

