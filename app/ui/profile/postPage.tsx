"use client";

import {
  createPost,
  createReply,
  getPost,
  getReplies,
  getUserByEmail,
} from "@/app/lib/actions";
import { Post } from "@/app/lib/definitions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { set } from "zod";
import Avatar from "@mui/material/Avatar";
import { HiDotsHorizontal, HiOutlinePhotograph } from "react-icons/hi";
import { IoMdArrowBack } from "react-icons/io";
import { BackButton } from "../buttons";
import { useSession } from "next-auth/react";
import { PostFeed } from "../home/feed";
import { useFormState } from "react-dom";
import { HiOutlineGif } from "react-icons/hi2";
import { RiListRadio } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";

export default function PostPage({
  params,
}: {
  params: { username: string; post_id: string };
}) {
  const [posts, setPosts] = useState([] as any[]);
  const [username, setUsername] = useState("");
  const { data: session } = useSession();
  const [replies, setReplies] = useState([] as Post[]);
  useEffect(() => {
    getUserByEmail(session?.user?.email as string).then((res) => {
      setUsername(res);
    });
    getPost(post_id).then((res) => {
      setPosts(res);
    });
    getReplies(post_id).then((res) => {
      setReplies(res);
    });
  }, []);
  const post_id = params.post_id;

  function PostDetails() {
    return (
      <div>
        {posts.map((post) => {
          const date = new Date(post.created_at);
          const now = new Date();
          const nowInHK = new Date(now.getTime() - 8 * 60 * 60 * 1000);
          const howRecent = Math.round(
            (nowInHK.getTime() - date.getTime()) / 3600000
          );
          const options: Intl.DateTimeFormatOptions = {
            month: "short",
            day: "numeric",
          };
          const detailOptions: Intl.DateTimeFormatOptions = {
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
            <div className="border py-3 z-0 px-4  flex" key={post.post_id}>
              <div className="w-full z-0 border ">
                {/* header1 */}
                <div className="relative flex h-[53px] items-center ">
                  <BackButton />
                  <div className="absolute left-14 font-bold text-xl">Post</div>
                </div>
                {/* header */}
                <div className="w-full flex items-center ">
                  <div className="w-[44px] h-[44px] border">
                    <Avatar
                      sx={{ width: 42, height: 42, zIndex: 0 }}
                      alt="Remy Sharp"
                      src={post.image as string}
                    />
                  </div>
                  <div className="w-full relative flex flex-col px-2 border text-sm gap-1">
                    <span className="font-semibold flex gap-1">
                      {post.name}
                      <MdVerified className="text-xl text-twitter" />{" "}
                    </span>
                    <span className="border text-gray-600 ">
                      {" "}
                      @{post.username}
                    </span>
                  </div>
                  {username != params.username && (
                    <button className="h-[32px] font-semibold text-sm rounded-full px-3 bg-black text-white">
                      Subscribe
                    </button>
                  )}
                  <button className="flex justify-center items-center h-[32px] w-[32px] font-semibold text-sm rounded-full hover:bg-twitter-light ">
                    <HiDotsHorizontal />
                  </button>
                </div>
                {/* content */}
                <div className="text-wrap break-all py-2">{post.content}</div>
                <div>
                  {post.medialinks && post.medialinks[0] && (
                    <div>
                      {post.medialinks.map((link: string) => (
                        <Image
                          key={link}
                          className="rounded-2xl w-full"
                          alt="image"
                          width={4080}
                          height={4080}
                          src={link}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {/* time */}
                <div className="relative w-40 group border text-gray-600  text-sm">
                  <div className=" hover:underline">{reorderedDate}</div>

                  <div className="p-1 absolute bg-black text-white z-3 text-xs bg-opacity-60 rounded-sm top-4  text-nowrap hidden group-hover:block">
                    {reorderedDate}
                  </div>
                </div>
                {/* footer */}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      <PostDetails />
      <ReplyBox post_id={post_id} />
      <PostFeed posts={replies} />
    </div>
  );
}
function ReplyBox({ post_id }: { post_id: string }) {
  const [showWhoCanReplyButton, setShowWhoCanReplyButton] = useState(false);
  const { data: session } = useSession();
  const initialState = { error: null, message: "" };
  const [postButtonDisabled, setPostButtonDisabled] = useState(true);
  const [username, setUsername] = useState("");
  const [state, formAction] = useFormState(createReply, initialState);
  useEffect(() => {
    getUserByEmail(session?.user?.email as string).then((user) => {
      setUsername(user);
    });
  }, []);
  const uploadPhoto = (e: any) => {
    const media = document.getElementById("media") as HTMLImageElement;
    for (let i = 0; i < e.target.files.length; i++) {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(e.target.files[i]);
      image.className = "w-full rounded-2xl ";
      media.appendChild(image);
    }
  };
  const handleUploadImage = (e: any) => {
    e.preventDefault();
    if (!showWhoCanReplyButton) {
      const textArea = document.getElementById(
        "text-area"
      ) as HTMLTextAreaElement;
      textArea.focus();
    } else {
      const uploadImage = document.getElementById(
        "uploadImage"
      ) as HTMLInputElement;
      uploadImage.click();
    }
  };
  function auto_grow(e: any) {
    if (e.target.value != "" && username != "") {
      setPostButtonDisabled(false);
    } else {
      setPostButtonDisabled(true);
    }
    e.target.style.height = "30px";
    e.target.style.height = e.target.scrollHeight + "px";
  }
  return (
    <div className={`w-full py-2 border flex bg-white  pr-2 pl-4 `}>
      <div className="w-[44px] h-[44px] border ">
        <Avatar
          sx={{ width: 42, height: 42 }}
          alt="Remy Sharp"
          src={session?.user?.image as string}
        />
      </div>
      <form action={formAction} className="w-full">
        <div className="px-2 border w-full">
          <input
            id="usename"
            type="hidden"
            name="username"
            value={username}
          ></input>
          <input
            id="post_id"
            type="hidden"
            name="post_id"
            value={post_id}
          ></input>
          <textarea
            id="text-area"
            placeholder="What is happening?"
            name="content"
            onFocus={() => setShowWhoCanReplyButton(true)}
            onInput={auto_grow}
            wrap="soft"
            className="border w-full my-2 placeholder:text-xl text-xl resize-none h-[30px] focus:outline-none overflow-hidden border-gray-300"
          ></textarea>
          <div id="media"></div>
          <div
            className={`border ${
              showWhoCanReplyButton ? "block" : "hidden"
            } h-[37px]`}
          >
            {/* <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="flex items-center px-3 gap-1 transition duration-150 cursor-not-allowed border rounded-full  hover:bg-twitter-light text-twitter font-semibold text-sm p-1"
            >
              <FaEarthAmericas />
              Everyone can reply
            </button> */}
          </div>
          <div className="relative h-[48px] border flex gap-2 items-center  ">
            <button
              onClick={handleUploadImage}
              className="w-[34px] h-[34px] flex items-center justify-center rounded-full cursor-pointer hover:bg-twitter-light transition duration-150"
            >
              <HiOutlinePhotograph className=" text-twitter text-xl " />
            </button>

            <input
              multiple={true}
              type="file"
              onChange={uploadPhoto}
              className="hidden"
              name="uploadImage"
              id="uploadImage"
            />
            <div className="w-[34px] h-[34px] cursor-not-allowed flex items-center justify-center rounded-full  hover:bg-twitter-light transition duration-150">
              <HiOutlineGif className=" text-twitter text-xl " />
            </div>

            <div className="w-[34px] h-[34px] flex items-center justify-center rounded-full cursor-not-allowed hover:bg-twitter-light transition duration-150">
              <FaRegSmile className="text-twitter text-xl" />
            </div>

            <div className="w-[34px] h-[34px] flex items-center justify-center rounded-full ">
              <GrLocation className="text-twitter text-xl opacity-60" />
            </div>

            <button
              disabled={postButtonDisabled}
              type="submit"
              className={`absolute right-0 bottom-1 flex  w-[66px] h-[36px] bg-twitter hover:bg-twitter-dark transition duration-200 items-center  border-gray-300 justify-center gap-2 rounded-full`}
            >
              <span className="text-sm font-semibold text-white">Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
