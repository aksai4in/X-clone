"use client";
import Image from "next/image";
import { Suspense, useState } from "react";
import { PostFeedSceleton } from "../skeletons";
import { Post } from "@/app/lib/definitions";
import { use } from "react";
import { fetchPosts } from "@/app/lib/actions";
import Avatar from "@mui/material/Avatar";
import { useSession } from "next-auth/react";

const postPromise = fetch("/api/posts").then((res) => res.json());

export default function Feed() {
  const [contentType, setContentType] = useState(1);
  const posts = use(postPromise);
  return (
    <div className="relative border border-l-0 w-full max-w-[600px]">
      <div className="absolute top-0 z-1 w-full border-b-[1px] flex bg-white bg-opacity-10 backdrop-blur">
        <button
          onClick={() => {
            setContentType(1);
          }}
          className="hover:bg-opacity-30 hover:backdrop-blur hover:bg-gray-300 transition duration-150  h-[53px] w-[50%] flex items-center justify-center"
        >
          <div
            className={`${
              contentType == 1 ? "" : " text-neutral-500 "
            } font-semibold text-sm relative h-full  flex items-center `}
          >
            For you
            <div
              className={`${
                contentType == 1 ? "block" : "hidden"
              } absolute bottom-0 w-full h-1 bg-twitter rounded-full`}
            ></div>
          </div>
        </button>
        <button
          onClick={() => {
            setContentType(2);
          }}
          className="hover:bg-opacity-30 hover:backdrop-blur hover:bg-gray-300 transition duration-150  h-[53px] w-1/2 flex items-center justify-center "
        >
          <div
            className={`${
              contentType == 2 ? "" : " text-neutral-500 "
            } font-semibold text-sm relative h-full  flex items-center `}
          >
            Following
            <div
              className={`${
                contentType == 2 ? "block" : "hidden"
              } absolute bottom-0 w-full h-1 bg-twitter rounded-full`}
            ></div>
          </div>
        </button>
      </div>
      <div
        className="h-full w-full z-0 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="h-[53px] w-full z-0"></div>
        <PostBox />
        <Suspense fallback={<PostFeedSceleton />}>
          <PostFeed posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
function PostFeed({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.post_id}>{post.content}</div>
      ))}
    </div>
  );
}
function PostBox() {
  const [showWhoCanReplyButton, setShowWhoCanReplyButton] = useState(false);
  const { data: data } = useSession();
  return (
    <div className={`w-full py-2 border flex bg-white  px-2 `}>
      <div className="w-[44px] h-[44px] border ">
        <Avatar
          sx={{ width: 42, height: 42 }}
          alt="Remy Sharp"
          src={data?.user?.image as string}
        />
      </div>
      <div className="px-2 border w-full">
        <textarea
          placeholder="What is happening?"
          name="var_1"
          onFocus={() => setShowWhoCanReplyButton(true)}
          onInput={auto_grow}
          wrap="soft"
          className="border w-full my-2 placeholder:text-xl text-xl resize-none h-[30px] focus:outline-none overflow-hidden border-gray-300"
        ></textarea>
        <div
          className={`border ${
            showWhoCanReplyButton ? "block" : "hidden"
          } h-[37px]`}
        >
          <button>Everyone can reply</button>
        </div>
        <div className="relative h-[48px] border ">
          <button className="absolute right-2 bottom-0">Post</button>
        </div>
      </div>
    </div>
  );
}
function auto_grow(e) {
  e.target.style.height = "30px";
  e.target.style.height = e.target.scrollHeight + "px";
}
