import { Box, Flex, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Inter, Open_Sans } from "next/font/google";
import "@/styles/global.css";

import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";
import Appbar from "../components/Appbar";

// const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" className={openSans.variable}>
        <body>
          <Theme>
            <Flex width="100%">
              <SignedIn>
                <Sidebar />
              </SignedIn>
              <Box width="100%">
                <SignedIn>
                  <Appbar />
                </SignedIn>
                <main style={{ padding: "2rem" }}>{children}</main>
              </Box>
            </Flex>
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}

