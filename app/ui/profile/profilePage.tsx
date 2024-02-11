"use client";

import { getUser, getUserPosts } from "@/app/lib/actions";
import { useContext, useEffect, useState } from "react";
import { BackButton } from "../buttons";
import { useSession } from "next-auth/react";
import { PostFeed } from "../home/feed";
import { context } from "@/app/(main)/layout";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { HiOutlineCalendarDays } from "react-icons/hi2";

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const [posts, setPosts] = useState([] as any[]);
  const [username] = useContext(context);
  const [user, setUser] = useState({} as any);
  const [joinDate, setJoinDate] = useState("");
  const { data: session } = useSession();
  useEffect(() => {
    if (!username) return;
    getUser(username).then((res) => {
      setUser(res);
      const date_of_joining = new Date(res.date_of_joining);
      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        date_of_joining
      );
      const year = date_of_joining.getFullYear();
      setJoinDate(`Joined ${month} ${year}`);
    });
    getUserPosts(username).then((res) => {
      setPosts(res);
    });
  }, [username]);
  console.log(user);

  function ProfileDetails() {
    return (
      <div className="relative">
        <Image
          src={user.profile_photo}
          alt={"image"}
          width={400}
          height={400}
          className="w-full h-[200px] object-cover"
        ></Image>
        <Avatar
          sx={{ width: 134, height: 134 }}
          alt="avatar"
          className="absolute left-4 top-[133px] border-4 border-white bg-white"
          src={session?.user?.image as string}
        />
        <div className="border w-full h-16 pr-4 gap-2 flex justify-end items-center">
          <button className="flex border justify-center items-center h-[32px] w-[32px] font-semibold text-sm rounded-full hover:bg-twitter-light ">
            <HiDotsHorizontal />
          </button>
          {username == params.username && (
            <button className="h-[32px] font-semibold text-sm rounded-full px-3 bg-black text-white">
              Follow
            </button>
          )}
        </div>
        <div className="p-4">
          <div className=" flex my-2">
            <div className="flex flex-col">
              <div className="flex">
                <span className="font-bold">{user.name}</span>
                <MdVerified className="text-xl text-twitter" />
              </div>

              <span className="text-sm text-gray-500">@{user.username}</span>
            </div>
          </div>
          {/* bio */}
          <div>{user.bio}</div>
          {/* join date */}
          <div className="flex text-sm gap-1 text-gray-500 ">
            <HiOutlineCalendarDays />
            {joinDate}
          </div>
          <div className="flex gap-2">
            <span>
              0<span className="text-sm ">Following</span>
            </span>
            <span>
              0<span className="text-sm ">Followers</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
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
          <span className="font-bold">{user.name}</span>
          <span className="text-sm text-gray-500">{posts.length} posts</span>
        </div>
      </div>
    );
  }
  console.log(posts);
  return (
    <div className="relative  min-w-[600px]">
      <Header />
      <ProfileDetails />
      <PostFeed posts={posts} />
    </div>
  );
}
