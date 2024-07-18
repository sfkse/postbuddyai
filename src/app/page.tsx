import ConnectTwitter from "@/components/ConnectTwitter";
import { getUser } from "@/utils/actions";
import { User } from "@prisma/client";
import { Text } from "@radix-ui/themes";

async function Dashboard() {
  const user = (await getUser()) as User | null;

  if (user && !user.isTwitterConnected) {
    return <ConnectTwitter />;
  }

  return <Text>Dasboard</Text>;
}

export default Dashboard;

