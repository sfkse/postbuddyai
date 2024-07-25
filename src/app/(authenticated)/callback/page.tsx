"use client";
import { getAccessToken, saveAccessToken } from "@/utils/actions";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function TwitterCallback() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const oauth_token = params.get("oauth_token");
  const oauth_verifier = params.get("oauth_verifier");
  let timer: NodeJS.Timeout;

  useEffect(() => {
    if (oauth_token && oauth_verifier) {
      handleTwitterCallback();
    }
  }, [oauth_token, oauth_verifier]);

  const handleTwitterCallback = async () => {
    try {
      const access_token = await getAccessToken(
        oauth_token as string,
        oauth_verifier as string
      );
      await saveAccessToken(access_token);

      return router.push("/");
    } catch (error) {
      console.log("error", error);
      setError(
        "Error connecting Twitter. You will be redirected to Home page."
      );
    }
    // redirect("/");
  };

  return <>{error ? <div>{error}</div> : <div>Redirecting...</div>}</>;
}

export default TwitterCallback;

