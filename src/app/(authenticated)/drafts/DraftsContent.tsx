import CardGroup from "@/components/CardGroup";
import { Tweets } from "@prisma/client";
import { Grid } from "@radix-ui/themes";
import TweetCardContent from "../campaigns/[id]/TweetCardContent";

type DraftsContentProps = {
  drafts: Tweets[];
};

function DraftsContent({ drafts }: DraftsContentProps) {
  return (
    <Grid mt="8" gap="4" columns="repeat(auto-fill,minmax(250px, 1fr)">
      {drafts.map((tweet) => (
        <CardGroup
          key={tweet.id}
          cardTitle="John Doe"
          CardContent={<TweetCardContent tweet={tweet} />}
        />
      ))}
    </Grid>
  );
}

export default DraftsContent;

