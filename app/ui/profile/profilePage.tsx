"use client";

import {
  createFollow,
  deleteFollow,
  getUser,
  getUserPosts,
} from "@/app/lib/actions";
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
import { PostFeedSceleton } from "../skeletons";

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const [posts, setPosts] = useState([] as any[]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [follows, setFollows] = useState(false);
  const [following, setFollowing] = useState(0 as number);
  const [followers, setFollowers] = useState(0 as number);
  const [username] = useContext(context);
  const [user, setUser] = useState({} as any);
  const [joinDate, setJoinDate] = useState("");
  const { data: session } = useSession();
  useEffect(() => {
    if (username) {
      getUser(username, params.username).then((res) => {
        setUser(res);
        console.log(res);
        setFollows(res.follows);
        setFollowing(parseInt(res.following));
        setFollowers(parseInt(res.followers));

        if (res.date_of_joining) {
          const date_of_joining = new Date(res.date_of_joining);
          const month = new Intl.DateTimeFormat("en-US", {
            month: "long",
          }).format(date_of_joining);
          const year = date_of_joining.getFullYear();
          setJoinDate(`Joined ${month} ${year}`);
        }
      });
    }
    getUserPosts(params.username).then((res) => {
      setPosts(res);
      setLoadingPosts(false);
    });
  }, [username]);
  useEffect(() => {
    console.log("followers changed to " + followers);
    console.log(typeof followers);
  }, [followers]);

  const follow = () => {
    createFollow(username, params.username).then((res) => {
      if (res) {
        setFollows(true);
        setFollowers((f) => f + 1);
      } else {
        console.log("error");
      }
    });
  };
  const unfollow = () => {
    deleteFollow(username, params.username).then((res) => {
      if (res) {
        setFollows(false);
        setFollowers((f) => f - 1);
      } else {
        console.log("error");
      }
    });
  };

  function ProfileDetails() {
    return (
      <div className="relative border-b  ">
        <img
          src={user.profile_photo ? user.profile_photo : "/gray.png"}
          alt={"image"}
          className="w-full h-[200px] object-cover"
        ></img>
        <Avatar
          sx={{ width: 134, height: 134 }}
          alt="avatar"
          className="absolute left-4 top-[133px] border-4 border-white"
          src={user.image as string}
        />
        <div className="border w-full h-16 pr-4 gap-2 flex justify-end items-center">
          {username != params.username && (
            <>
              <button className="flex cursor-not-allowed border justify-center items-center h-[32px] w-[32px] font-semibold text-sm rounded-full hover:bg-twitter-light ">
                <HiDotsHorizontal />
              </button>
              {user.username && (
                <>
                  {!follows && (
                    <button
                      onClick={follow}
                      className="h-[32px] font-semibold text-sm rounded-full px-3 bg-black text-white"
                    >
                      Follow
                    </button>
                  )}
                  {follows && (
                    <button
                      onClick={unfollow}
                      onMouseEnter={(e) => {
                        e.currentTarget.textContent = "Unfollow";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.textContent = "Following";
                      }}
                      className="h-[32px] w-[103px] font-semibold text-sm rounded-full px-3 border transition duration-150 hover:bg-red-100 hover:border-red-400 hover:text-red-600"
                    >
                      Following
                    </button>
                  )}
                </>
              )}
            </>
          )}
          {username == params.username && (
            <>
              <button
                onClick={follow}
                className="h-[32px] px-4 font-semibold text-sm rounded-full border hover:bg-gray-200 transition duration-150"
              >
                Edit profile
              </button>
            </>
          )}
        </div>
        <div className="p-4">
          <div className=" flex my-2">
            <div className="flex flex-col">
              <div className="flex">
                {user ? (
                  <>
                    <span className="font-bold">{user.name}</span>
                    {user.verified ? (
                      <MdVerified className="text-xl text-twitter" />
                    ) : (
                      <div></div>
                    )}
                  </>
                ) : (
                  <div></div>
                )}
              </div>
              {user.username ? (
                <>
                  {" "}
                  <span className="text-sm text-gray-500">
                    @{user.username}
                  </span>{" "}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* bio */}
          <div>{user.bio}</div>
          {/* join date */}
          {joinDate ? (
            <>
              <div className="flex text-sm gap-1 text-gray-500 ">
                <HiOutlineCalendarDays />
                {joinDate}
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="flex gap-2">
            <span className="hover:underline flex gap-1">
              <span className="text-sm">{following}</span>
              <span className="text-sm ">Following</span>
            </span>
            <span className="hover:underline flex gap-1">
              <span className="text-sm">{followers}</span>
              <span className="text-sm ">Followers</span>
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
    <div className="relative border-r  min-w-[600px]">
      <Header />
      <ProfileDetails />
      {loadingPosts && <PostFeedSceleton />}
      {!loadingPosts && (
        <>
          {posts.length > 0 && <PostFeed posts={posts} setPosts={setPosts} />}
          {posts.length == 0 && (
            <div className="flex justify-center mt-4 w-full h-[500px] text-xl">
              No posts yet
            </div>
          )}
        </>
      )}
    </div>
  );
}
