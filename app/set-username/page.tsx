import { FaXTwitter } from "react-icons/fa6";
import { BackButton } from "../ui/buttons";
import { useEffect, useState } from "react";
import { getUser, getUserByEmail, insertUsername } from "../lib/actions";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import SetUsernamePage from "../ui/setUsername";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();
  const username = await getUserByEmail(session?.user?.email as string);
  if (username) redirect("/home");
  return <SetUsernamePage />;
}
