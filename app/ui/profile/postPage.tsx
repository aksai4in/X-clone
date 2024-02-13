"use client";

import {
  bookmark,
  createPost,
  createReply,
  deletePost,
  dislike,
  getPost,
  getReplies,
  getUserByEmail,
  like,
  unbookmark,
} from "@/app/lib/actions";
import { Post } from "@/app/lib/definitions";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { set } from "zod";
import Avatar from "@mui/material/Avatar";
import {
  HiBookmark,
  HiDotsHorizontal,
  HiOutlineBookmark,
  HiOutlinePhotograph,
  HiOutlineTrash,
} from "react-icons/hi";
import { IoMdArrowBack } from "react-icons/io";
import { BackButton } from "../buttons";
import { useSession } from "next-auth/react";
import { PostFeed } from "../home/feed";
import { useFormState } from "react-dom";
import { HiOutlineGif } from "react-icons/hi2";
import { RiListRadio } from "react-icons/ri";
import { FaComment, FaRegSmile, FaRetweet } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { PostFeedSceleton } from "../skeletons";
import { useRouter } from "next/navigation";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoStatsChart } from "react-icons/io5";
import { LuShare } from "react-icons/lu";
import { context } from "../mainLayout";

export default function PostPage({
  params,
}: {
  params: { username: string; post_id: number };
}) {
  const [post, setPost] = useState({} as any);
  const [username, bookmarked, setBookmarked] = useContext(context);
  const [replies, setReplies] = useState([] as Post[]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [liked, setLiked] = useState(false);
  const [like_count, setLikeCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!username) return;
    getPost(username, post_id).then((res) => {
      console.log(res);
      setPost(res);
      setLiked(res.liked == "1");
      setLikeCount(parseInt(res.like_count));
      setIsBookmarked(bookmarked.has(post_id));
      const date = new Date(res.created_at);
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
      setDate(`${parts[2].trim()} · ${parts[0].trim()}, ${parts[1].trim()}`);
    });
    getReplies(username, post_id).then((res) => {
      setReplies(res);
      setLoading(false);
    });
  }, [username]);

  const post_id = params.post_id;
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
          <span className="font-bold">Post</span>
        </div>
      </div>
    );
  }
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (showDeleteButton && !event.target.closest(".my-element")) {
        setShowDeleteButton(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDeleteButton]);

  function PostDetails() {
    return (
      <div className=" py-3 z-0 px-4  flex border-b" key={post.post_id}>
        <div className="w-full z-0  ">
          {/* header */}
          <div className="w-full flex items-center  pt-2">
            <div className="w-[44px] h-[44px] ">
              <Avatar
                className="cursor-pointer"
                sx={{ width: 42, height: 42, zIndex: 0 }}
                alt="Remy Sharp"
                src={post.image as string}
                onClick={() => {
                  router.push(`/${post.username}`);
                }}
              />
            </div>
            <div className="w-full relative flex flex-col px-2  text-sm gap-1">
              <span
                onClick={() => {
                  router.push(`/${post.username}`);
                }}
                className="font-semibold flex gap-1 cursor-pointer hover:underline"
              >
                {post.name}

                {post.verified && (
                  <MdVerified className="text-xl text-twitter" />
                )}
              </span>
              <span
                onClick={() => {
                  router.push(`/${post.username}`);
                }}
                className=" text-gray-600 cursor-pointer"
              >
                {post.username && <>@{post.username}</>}
              </span>
              {username == post.username && (
                <div className="">
                  {showDeleteButton && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePost(post.post_id).then((res) => {
                            if (res) {
                              router.back();
                            }
                          });
                        }}
                        className="absolute top-0 w-[150px] bg-white right-0 pr-6 pl-4 hover:bg-gray-200 transition duration-150 font-semibold z-30 py-2 rounded-xl border flex  items-center text-red-500 gap-2"
                      >
                        <HiOutlineTrash className=" text-lg" />
                        Delete
                      </button>
                    </>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteButton(true);
                    }}
                    className=" absolute z-0 transition duration-150  right-0  top-0  flex justify-center items-center h-[32px] w-[32px] font-semibold text-sm rounded-full hover:bg-twitter-light "
                  >
                    <HiDotsHorizontal />
                  </button>
                </div>
              )}
              {username != post.username && (
                <button className="transition duration-150 absolute right-0 top-0 cursor-not-allowed  flex justify-center items-center h-[32px] w-[32px] font-semibold text-sm rounded-full hover:bg-twitter-light ">
                  <HiDotsHorizontal />
                </button>
              )}
            </div>
            {/* {username != post.username && (
              <button className="h-[32px] font-semibold text-sm rounded-full px-3 bg-black text-white">
                Follow
              </button>
            )} */}
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
          <div className="relative w-40 group  text-gray-600  text-sm">
            <div className=" hover:underline">{date}</div>

            <div className="p-1 absolute bg-black text-white z-3 text-xs bg-opacity-60 rounded-sm top-4  text-nowrap hidden group-hover:block">
              {date}
            </div>
          </div>
          {/* footer */}
          <div className=" h-[32px] grid grid-cols-5 justify-items-center items-center">
            {/* replies */}
            <div>
              <FaComment />
            </div>
            {/* reposts */}
            <div>
              <FaRetweet />
            </div>
            {/* likes */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (liked) {
                  dislike(username, post.post_id).then((res) => {
                    if (res) {
                      setLikeCount(like_count - 1);
                      setLiked(false);
                    }
                  });
                } else {
                  like(username, post.post_id).then((res) => {
                    if (res) {
                      setLikeCount(like_count + 1);
                      setLiked(true);
                    }
                  });
                }
              }}
              className="flex items-center gap-1"
            >
              <GoHeart className={liked ? "hidden" : "block"} />
              <GoHeartFill className={liked ? "block" : "hidden"} />
              <div id="likes" className="text-sm">
                {like_count}
              </div>
            </button>
            {/* views */}
            <div>
              <IoStatsChart />
            </div>
            {/* bookmark & share */}
            <div className="flex">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (bookmarked.has(post.post_id)) {
                    unbookmark(username, post.post_id).then((res) => {
                      if (res) {
                        bookmarked.delete(post.post_id);
                        setBookmarked(bookmarked);
                        setIsBookmarked(false);
                      }
                    });
                  } else {
                    bookmark(username, post.post_id).then((res) => {
                      if (res) {
                        bookmarked.add(post.post_id);
                        setBookmarked(bookmarked);
                        setIsBookmarked(true);
                      }
                    });
                  }
                }}
              >
                <HiOutlineBookmark
                  className={isBookmarked ? "hidden" : "block"}
                />
                <HiBookmark className={isBookmarked ? "block" : "hidden"} />
              </button>
              <LuShare />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <PostDetails />
      <ReplyBox
        post_id={post_id}
        posts={replies}
        setPosts={setReplies}
        params={params}
      />
      {!loading && <PostFeed posts={replies} setPosts={setReplies} />}
      {loading && <PostFeedSceleton />}
    </div>
  );
}
function ReplyBox({
  post_id,
  posts,
  setPosts,
  params,
}: {
  post_id: number;
  posts: any[];
  setPosts: any;
  params: any;
}) {
  const { data: session } = useSession();
  const initialState = { error: null, message: "" };
  const [postButtonDisabled, setPostButtonDisabled] = useState(true);
  const [username, setUsername] = useContext(context);
  const [state, formAction] = useFormState(createReply, initialState);
  const [showReplyButtons, setShowReplyButtons] = useState(false);
  const router = useRouter();
  const uploadPhoto = (e: any) => {
    const media = document.getElementById("media") as HTMLImageElement;
    for (let i = 0; i < e.target.files.length; i++) {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(e.target.files[i]);
      image.className = "w-full rounded-2xl ";
      media.appendChild(image);
    }
  };
  useEffect(() => {
    if (state.username) {
      const textArea = document.getElementById(
        "text-area"
      ) as HTMLTextAreaElement;
      const content = textArea?.value;
      textArea.value = "";
      console.log(state);
      const stateArr = new Array(state);
      setPosts(stateArr.concat(posts));
    }
  }, [state]);
  const handleUploadImage = (e: any) => {
    e.preventDefault();
    if (!showReplyButtons) {
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
    <div className={`w-full py-2  flex flex-col bg-white border-b  pr-2 pl-4 `}>
      {showReplyButtons && (
        <>
          <div className="pl-14 text-sm text-gray-500">
            Replying to{" "}
            <span
              onClick={() => {
                router.push(`/${params.username}`);
              }}
              className=" cursor-pointer text-twitter "
            >
              {" "}
              @{params.username}
            </span>
          </div>
        </>
      )}

      <div className="flex">
        <div className="w-[44px] h-[44px]  ">
          <Avatar
            sx={{ width: 42, height: 42 }}
            alt="Remy Sharp"
            src={session?.user?.image as string}
          />
        </div>
        <form action={formAction} className="w-full">
          <div className="px-2  w-full">
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
              placeholder="Post your reply"
              name="content"
              onFocus={() => {
                setShowReplyButtons(true);
              }}
              onInput={auto_grow}
              wrap="soft"
              className="pl-1 placeholder:text-gray-500 w-full my-2 placeholder:text-xl text-xl resize-none h-[30px] focus:outline-none overflow-hidden border-gray-300"
            ></textarea>
            <div id="media"></div>

            <div className="relative">
              {showReplyButtons && (
                <>
                  <div className=" h-[48px]  flex gap-2 items-center  ">
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
                  </div>
                </>
              )}

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
    </div>
  );
}
