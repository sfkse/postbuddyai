import { Prisma } from "@prisma/client";

const campaignsWithTweets = Prisma.validator<Prisma.CampaignDefaultArgs>()({
  include: { tweets: true },
});

export type CampaignsWithTweets = Prisma.CampaignGetPayload<
  typeof campaignsWithTweets
>;

// Geenrate type for tweets with campaign name
// const tweets = await prisma.tweets.findMany({
//   where: {
//     userId,
//   },
//   select: {
//     id: true,
//     content: true,
//     status: true,
//     scheduledAt: true,
//     campaign: {
//       select: {
//         name: true,
//       },
//     },
//   },
// });

const tweetsWithCampaignName = Prisma.validator<Prisma.TweetsDefaultArgs>()({
  include: { campaign: { select: { name: true } } },
});

export type TweetsWithCampaignName = Prisma.TweetsGetPayload<
  typeof tweetsWithCampaignName
>;
