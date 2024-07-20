"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./script";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { randomUUID } from "crypto";
import { Campaign } from "@prisma/client";
import { ECampaignStatus, ETweetStatus } from "./enums";
import { z } from "zod";
import OpenAI from "openai";
import { createSignature } from "@/services/twitter";

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
        status: parseInt(status),
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

export const getCampaignTweets = async (campaignId: string) => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const tweets = await prisma.tweets.findMany({
      where: {
        userId,
        campaignId,
        status: ETweetStatus.ACTIVE,
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

export const generateTweet = async (topics: string) => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a twitter user. Generate a tweet about ${topics} with a personal tone. Use maximum 280 characters.`,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
// USER ACTIONS
export const createUser = async (userData: any) => {
  const { id, username, email } = userData;

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

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

export const getUser = async () => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// TWEETER AUTH ACTIONS
export const getRequestToken = async () => {
  const { X_API_ENDPOINT, X_CONSUMER_KEY, X_CALLBACK_URL, X_CONSUMER_SECRET } =
    process.env;
  // Generate random data, and stripping out all non-word characters like rISPJhphM5R
  const oauthNonce = randomUUID().replace(/\W/g, "").slice(0, 11);
  const requestTokenUrl = `${X_API_ENDPOINT}/oauth/request_token`;
  const method = "POST";
  // Oauth parameters
  const oauthParams = {
    oauth_consumer_key: X_CONSUMER_KEY,
    oauth_nonce: oauthNonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: "1.0",
  };

  const oauthSignature = createSignature(
    method,
    requestTokenUrl,
    oauthParams,
    X_CONSUMER_SECRET as string
  );

  Object.assign(oauthParams, { oauth_signature: oauthSignature });

  // Construct the Authorization header
  const authHeader = Object.keys(oauthParams)
    .sort()
    .map((key) => `${key}="${encodeURIComponent(oauthParams[key])}"`)
    .join(", ");

  try {
    const response = await fetch(requestTokenUrl, {
      method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `OAuth ${authHeader}`,
      },
    });

    if (!response.ok)
      return new NextResponse("Request Token Error", { status: 400 });

    const data = await response.text();

    const oauthToken = data.split("&")[0].split("=")[1];

    return oauthToken;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

