"use client";
import { useContext, useEffect, useState } from "react";
import { PostFeed } from "../home/feed";
import { getBookmarkedPosts } from "@/app/lib/actions";
import { useSession } from "next-auth/react";
import { context } from "@/app/(main)/layout";
import { PostFeedSceleton } from "../skeletons";

export default function Bookmarks() {
  const [username, bookmarked] = useContext(context);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([] as any[]);
  const { data: session } = useSession();
  useEffect(() => {
    if (username != "") {
      getBookmarkedPosts(username).then((res) => {
        console.log(username);
        console.log(res);
        setPosts(res);
        setIsLoading(false);
      });
    }
  }, [username]);
  return (
    <div className="min-w-[600px]">
      {isLoading && <PostFeedSceleton />}
      {!isLoading && <PostFeed posts={posts} />}
    </div>
  );
}
