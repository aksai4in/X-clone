"use client";
import { createContext, useEffect, useState } from "react";
import SideNav from "../ui/home/side-nav";
import { useSession } from "next-auth/react";
import { getBookmarkedPostIds, getUserByEmail } from "../lib/actions";
import { useRouter } from "next/navigation";

export const context = createContext({} as any);
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [username, setUsername] = useState("" as string);
  const [bookmarked, setBookmarked] = useState(new Set());
  const router = useRouter();
  useEffect(() => {
    getUserByEmail(session?.user?.email as string).then((res) => {
      if (!res) {
        router.push("/set-username");
      } else {
        console.log(res.username);
        setUsername(res.username);
        getBookmarkedPostIds(res.username).then((bookmarked) => {
          const b = bookmarked.map((b) => b.post_id);
          setBookmarked(new Set(b));
        });
      }
    });
  }, []);
  return (
    <div className=" flex">
      <context.Provider value={[username, bookmarked, setBookmarked]}>
        <SideNav />

        {children}
      </context.Provider>
      <div className="w-full"></div>
    </div>
  );
}
