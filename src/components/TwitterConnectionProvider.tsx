import { getUser } from "@/utils/actions";
import { User } from "@prisma/client";
import React from "react";
import ConnectTwitter from "./ConnectTwitter";
import { auth } from "@clerk/nextjs/server";

async function TwitterConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const user = (await getUser()) as User | null;

  if (userId && user && !user.isTwitterConnected) {
    return <ConnectTwitter />;
  }
  return <>{children}</>;
}

export default TwitterConnectionProvider;

