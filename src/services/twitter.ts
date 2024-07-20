import crypto from "crypto";

export const createSignature = (
  method: string,
  url: string,
  params: object,
  consumerSecret: string
) => {
  // Step 1: Percent encode
  const percentEncode = (str: string) => encodeURIComponent(str);

  // Step 2: Collect parameters
  let paramString = Object.keys(params)
    .sort()
    .map((key) => `${percentEncode(key)}=${percentEncode(params[key])}`)
    .join("&");

  // Step 3: Create the signature base string
  const signatureBaseString = `${method.toUpperCase()}&${percentEncode(
    url
  )}&${percentEncode(paramString)}`;
  // Step 4: Create the signing key
  const signingKey = `${percentEncode(consumerSecret)}&`;
  // Step 5: Generate the OAuth signature
  const oauthSignature = crypto
    .createHmac("sha1", signingKey)
    .update(signatureBaseString)
    .digest("base64");

  return oauthSignature;
};

