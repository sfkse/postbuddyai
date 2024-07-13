import { Prisma } from "@prisma/client";

const campaignsWithTweets = Prisma.validator<Prisma.CampaignDefaultArgs>()({
  include: { tweets: true },
});

export type CampaignsWithTweets = Prisma.CampaignGetPayload<
  typeof campaignsWithTweets
>;

