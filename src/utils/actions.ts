"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./script";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { randomUUID } from "crypto";
import { Campaign } from "@prisma/client";
import { ECampaignStatus } from "./enums";

export const createCampaign = async (formData: any) => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { name, description, autorenew } = Object.fromEntries(
    formData.entries()
  );

  const campaign: Campaign = {
    id: randomUUID(),
    name,
    description,
    userId,
    isAutoRenew: autorenew === "on",
    status: ECampaignStatus.ACTIVE,
    updatedAt: new Date(),
    createdAt: new Date(),
    topics: "frontend, backend, devops",
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

    return campaignsWithTweets;
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

