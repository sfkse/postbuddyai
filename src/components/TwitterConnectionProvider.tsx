"use client";
import { getUser } from "@/utils/actions";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ConnectTwitter from "./ConnectTwitter";

type TwitterConnectionProviderProps = {
  children: React.ReactNode;
};

function TwitterConnectionProvider({
  children,
}: TwitterConnectionProviderProps) {
  const [user, setUser] = useState<User>();
  const router = usePathname();
  const isCallbackPage = router === "/callback";

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser();
      // const user = response.data;
      setUser(response as User);
    };
    fetchUser();
  }, [router]);

  console.log(
    "user",
    user,
    "isTwitterConnected",
    user?.isTwitterConnected,
    "isCallbackPage",
    isCallbackPage
  );
  // console.log("oauth_token", oauth_token, "oauth_verifier", oauth_verifier);
  if (user && !user.isTwitterConnected && !isCallbackPage) {
    return <ConnectTwitter />;
  }
  return <>{children}</>;
}

export default TwitterConnectionProvider;

