"use client";
import { createContext, useEffect, useState } from "react";
import SideNav from "../ui/home/side-nav";
import { useSession } from "next-auth/react";
import { getBookmarkedPostIds, getUserByEmail } from "../lib/actions";

export const context = createContext({} as any);
export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [username, setUsername] = useState("" as string);
  const [bookmarked, setBookmarked] = useState(new Set());
  useEffect(() => {
    getUserByEmail(session?.user?.email as string).then((res) => {
      setUsername(res);
      getBookmarkedPostIds(res).then((bookmarked) => {
        const b = bookmarked.map((b) => b.post_id);
        setBookmarked(new Set(b));
      });
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
