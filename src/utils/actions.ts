"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./script";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { randomUUID } from "crypto";
import { Campaign } from "@prisma/client";
import { ECampaignStatus } from "./enums";
import { z } from "zod";
import { CampaignsWithTweets } from "./types";

// CAMPAIGN ACTIONS
export const createCampaign = async (formData: any) => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { name, topics, autorenew } = Object.fromEntries(formData.entries());

  const campaign: Campaign = {
    id: randomUUID(),
    name,
    topics,
    userId,
    isAutoRenew: autorenew === "on",
    status: ECampaignStatus.ACTIVE,
    updatedAt: new Date(),
    createdAt: new Date(),
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
      },
    });

    // Return response with type
    return campaignsWithTweets as CampaignsWithTweets;
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

