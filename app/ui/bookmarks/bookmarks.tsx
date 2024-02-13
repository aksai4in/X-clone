"use client";
import { useContext, useEffect, useState } from "react";
import { PostFeed } from "../home/feed";
import { getBookmarkedPosts } from "@/app/lib/actions";
import { useSession } from "next-auth/react";
import { PostFeedSceleton } from "../skeletons";
import { BackButton } from "../buttons";
import { context } from "../mainLayout";

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
  function Header() {
    function handleClick() {
      window.scrollTo(0, 0);
    }
    return (
      <div
        onClick={handleClick}
        className="sticky top-0  h-[53px] items-center  cursor-pointer z-10 max-w-[600px] w-full border-b-[1px] flex bg-white bg-opacity-10 backdrop-blur"
      >
        <BackButton />
        <div className="flex flex-col absolute left-14  text-xl">
          <span className="font-bold">Bookmarks</span>
          {username ? (
            <span className="text-sm text-gray-500">@{username}</span>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="min-w-[600px] border-r">
      <Header />
      {isLoading && <PostFeedSceleton />}
      {!isLoading && (
        <>
          {posts.length > 0 && <PostFeed posts={posts} setPosts={setPosts} />}
          {posts.length == 0 && (
            <div className="flex-col flex items-center font-bold mt-4 w-full h-screen text-xl">
              <span className="flex justify-center ">Save posts for later</span>
              <span className="text-sm text-gray-500 flex justify-center w-[300px]">
                Bookmark posts to easily find them again in the future.
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
