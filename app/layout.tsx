import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./components/session-provider";
import { getServerSession } from "next-auth";
import AuthButton from "./components/nav-menu";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "X clone. It's what's happenning / X clone",
  description: "X clone is a clone of X, former Twitter.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <AuthButton />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
