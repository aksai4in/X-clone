"use client";
import Image from "next/image";
import { Suspense, useCallback, useEffect, useState } from "react";
import { PostFeedSceleton } from "../skeletons";
import { Post } from "@/app/lib/definitions";
import { use } from "react";
import { createPost, fetchPosts } from "@/app/lib/actions";
import Avatar from "@mui/material/Avatar";
import { useSession } from "next-auth/react";
import { Session } from "inspector";
import { useFormState } from "react-dom";
import { MdVerified } from "react-icons/md";
import SideNav from "./side-nav";

// const postPromise = fetch("/api/posts").then((res) => res.json());

export default function Feed() {
  // { posts }: { posts: Post[] }
  const [data, setData] = useState([] as Post[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then((posts) => {
      setData(posts);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className=" border border-l-0  ">
      <div
        className="w-full max-w-[600px] z-0"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="max-w-[600px] ">
          <FeedSelectionButtons />
          <PostBox />
          {isLoading && <PostFeedSceleton />}
          {!isLoading && <PostFeed posts={data} />}
        </div>
      </div>
    </div>
  );
}

function FeedSelectionButtons() {
  const [contentType, setContentType] = useState(1);

  return (
    <div className="sticky  top-0 z-10 max-w-[600px] w-full border-b-[1px] flex bg-white bg-opacity-10 backdrop-blur">
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
  );
}

function PostFeed({ posts }: { posts: any[] }) {
  console.log(posts);

  return (
    <div>
      {posts.map((post) => {
        const date = new Date(post.created_at);
        const now = new Date();
        const nowInHK = new Date(now.getTime() - 8 * 60 * 60 * 1000);
        const howRecent = Math.round(
          (nowInHK.getTime() - date.getTime()) / 3600000
        );
        const options = {
          month: "short",
          day: "numeric",
        };
        const detailOptions = {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          month: "short",
          day: "numeric",
          year: "numeric",
        };
        const detailedTime = new Intl.DateTimeFormat(
          "en-US",
          detailOptions
        ).format(date);
        const parts = detailedTime.split(",");
        const reorderedDate = `${parts[2].trim()} · ${parts[0].trim()}, ${parts[1].trim()}`;
        return (
          <div
            className="border py-3 px-4 hover:bg-gray-50 transition duration-150 flex"
            key={post.post_id}
          >
            <div className="w-[44px] h-[44px] border">
              <Avatar
                sx={{ width: 42, height: 42, zIndex: 0 }}
                alt="Remy Sharp"
                src={post.image as string}
              />
            </div>
            <div className="w-full z-0 border px-3">
              {/* header */}
              <div className="flex text-sm gap-1">
                <span className="font-semibold">{post.name} </span>
                <MdVerified className="text-xl text-twitter" />

                <span className="text-gray-400">
                  {" "}
                  @{post.username} ·{" "}
                  <span className="relative group">
                    {howRecent < 24
                      ? howRecent + "h"
                      : new Intl.DateTimeFormat("en-US", options).format(date)}
                    <div className="p-1 absolute bg-black text-white z-3 text-xs bg-opacity-60 rounded-sm top-4 -left-14 text-nowrap hidden group-hover:block">
                      {reorderedDate}
                    </div>
                  </span>
                </span>
              </div>
              {/* content */}
              <div className="text-wrap break-all">{post.content}</div>

              {/* footer */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PostBox() {
  const [showWhoCanReplyButton, setShowWhoCanReplyButton] = useState(false);
  const { data: data } = useSession();
  const initialState = { message: "" };
  const [state, formAction] = useFormState(createPost, initialState);
  return (
    <div className={`w-full py-2 border flex bg-white  px-2 `}>
      <div className="w-[44px] h-[44px] border ">
        <Avatar
          sx={{ width: 42, height: 42 }}
          alt="Remy Sharp"
          src={data?.user?.image as string}
        />
      </div>
      <form action={formAction} className="w-full">
        <div className="px-2 border w-full">
          <input
            type="hidden"
            name="email"
            value={data?.user?.email as string}
          ></input>
          <textarea
            placeholder="What is happening?"
            name="content"
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
            <button
              className={`absolute right-2 bottom-2 flex  w-[66px] h-[36px] bg-twitter hover:bg-twitter-dark transition duration-200 py-2 items-center  border-gray-300 justify-center gap-2 my-2 rounded-full`}
            >
              <span className="text-md xl:block  font-semibold text-white">
                Post
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
function auto_grow(e: any) {
  e.target.style.height = "30px";
  e.target.style.height = e.target.scrollHeight + "px";
}
