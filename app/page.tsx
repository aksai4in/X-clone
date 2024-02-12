import Image from "next/image";
import Footer from "./ui/footer";
import LoginOptions from "./ui/login/login-options";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import LoginPage from "./ui/loginPage";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Home({ searchParams }: SearchParamProps) {
  const session = await getServerSession();
  if (session?.user?.name) {
    redirect("/home");
  }
  return <LoginPage />;
}
