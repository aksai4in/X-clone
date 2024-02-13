"use client";
import Image from "next/image";
import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { PostFeedSceleton } from "../skeletons";
import { Post } from "@/app/lib/definitions";
import { use } from "react";
import {
  bookmark,
  createPost,
  dislike,
  existsLike,
  getPosts,
  getLikes,
  getUserByEmail,
  like,
  unbookmark,
  getFollowingPosts,
  deletePost,
} from "@/app/lib/actions";
import Avatar from "@mui/material/Avatar";
import { useSession } from "next-auth/react";
import { Session } from "inspector";
import { useFormState } from "react-dom";
import { MdVerified } from "react-icons/md";
import SideNav from "./side-nav";
import { FaEarthAmericas, FaRegFaceSmile } from "react-icons/fa6";
import {
  HiBookmark,
  HiDotsHorizontal,
  HiOutlineBookmark,
  HiOutlinePhotograph,
  HiOutlineTrash,
} from "react-icons/hi";
import { PiUploadLight } from "react-icons/pi";
import { HiOutlineFaceSmile, HiOutlineGif } from "react-icons/hi2";
import { RiEyeCloseLine, RiListRadio } from "react-icons/ri";
import { TbCalendarTime } from "react-icons/tb";
import { FaComment, FaRegSmile, FaRetweet } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoStatsChart } from "react-icons/io5";
import { LuShare } from "react-icons/lu";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { context } from "../mainLayout";
// const postPromise = fetch("/api/posts").then((res) => res.json());

export default function Feed() {
  const [posts, setPosts] = useState([] as Post[]);
  const [followingPosts, setFollowingPosts] = useState([] as Post[]);
  const [isLoading, setIsLoading] = useState(true);
  const [username, bookmarked, setBookmarked] = useContext(context);
  const { data: session } = useSession();
  const [contentType, setContentType] = useState(1);
  useEffect(() => {
    if (username != "") {
      getPosts(username).then((res) => {
        setPosts(res);
        setIsLoading(false);
      });
      getFollowingPosts(username).then((res) => {
        setFollowingPosts(res);
      });
    }
  }, [username]);

  useEffect(() => {
    console.log("data changed");
  }, [posts]);

  function FeedSelectionButtons() {
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

  return (
    <div className=" border border-l-0 max-w-[600px] ">
      <div
        className="min-w-[600px]  max-w-[600px] z-0"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="max-w-[600px] ">
          <FeedSelectionButtons />
          {contentType == 1 && (
            <>
              <PostBox posts={posts} setPosts={setPosts} />
              {isLoading && <PostFeedSceleton />}
              {!isLoading && <PostFeed posts={posts} setPosts={setPosts} />}
            </>
          )}
          {contentType == 2 && (
            <>
              <PostBox posts={followingPosts} setPosts={setFollowingPosts} />
              {followingPosts.length == 0 && (
                <>
                  <div className="w-full mt-8 h-[600px] flex flex-col items-center">
                    <span className="w-[300px] m-2  flex  font-bold text-2xl">
                      Welcome to X Clone!
                    </span>
                    <span className="w-[300px]  flex text-sm text-gray-500">
                      {`This is the best place to see what's happening in your
                      world. Find some people and topics to follow now.`}
                    </span>
                  </div>
                </>
              )}
              {followingPosts.length > 0 && (
                <>
                  {" "}
                  {isLoading && <PostFeedSceleton />}
                  {!isLoading && (
                    <PostFeed
                      posts={followingPosts}
                      setPosts={setFollowingPosts}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function PostFeed({ posts, setPosts }: { posts: any[]; setPosts: any }) {
  return (
    <div id="post-feed">
      {posts.map((post) => (
        <PostComponent
          key={post.post_id}
          post={post}
          posts={posts}
          setPosts={setPosts}
        />
      ))}
    </div>
  );
}

function PostComponent({
  post,
  posts,
  setPosts,
}: {
  post: any;
  posts: any[];
  setPosts: any;
}) {
  const [username, bookmarked, setBookmarked] = useContext(context);
  const router = useRouter();
  const [like_count, setLikeCount] = useState(parseInt(post.like_count));
  const [liked, setLiked] = useState(post.liked == 1);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarked.has(post.post_id)
  );

  // date formatting
  const date = new Date(post.created_at);
  const now = new Date();
  const nowInHK = new Date(now.getTime());
  const howRecent = Math.round((nowInHK.getTime() - date.getTime()) / 3600000);
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
  const detailedTime = new Intl.DateTimeFormat("en-US", detailOptions).format(
    date
  );
  const parts = detailedTime.split(",");
  const reorderedDate = `${parts[2].trim()} · ${parts[0].trim()}, ${parts[1].trim()}`;
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
  return (
    <div
      onClick={() => {
        console.log(`/${post.username}/${post.post_id}`);
        router.push(`/${post.username}/${post.post_id}`);
      }}
      className=" py-3 z-0 px-4 border-b border-r hover:bg-gray-50 cursor-pointer transition duration-150 flex"
    >
      <div className="w-[44px] h-[44px] ">
        <Avatar
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/${post.username}`);
          }}
          className="cursor-pointer"
          sx={{ width: 42, height: 42, zIndex: 0 }}
          alt="Remy Sharp"
          src={post.image as string}
        />
      </div>
      <div className="w-full z-0  ">
        {/* header */}
        <div className="relative flex text-sm gap-1 pl-3 ">
          <span
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/${post.username}`);
            }}
            className="font-semibold hover:underline cursor-pointer"
          >
            {post.name}{" "}
          </span>
          {post.verified && <MdVerified className="text-xl text-twitter" />}

          <span
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/${post.username}`);
            }}
            className="text-gray-500 cursor-pointer"
          >
            {" "}
            @{post.username} ·{" "}
          </span>
          <span className="relative group text-gray-500 text-sm">
            {howRecent < 24
              ? howRecent + "h"
              : new Intl.DateTimeFormat("en-US", options).format(date)}
            <div className="p-1 absolute left-1/2 -translate-x-1/2  bg-black text-white z-3 text-xs bg-opacity-60 rounded-sm top-4  text-nowrap hidden group-hover:block">
              {reorderedDate}
            </div>
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
                          setPosts(
                            posts.filter((p) => p.post_id != post.post_id)
                          );
                        }
                      });
                    }}
                    className=" shadow-md ring-gray-400 absolute top-0 w-[150px] bg-white right-0 pr-6 pl-4 hover:bg-gray-200 transition duration-150 font-semibold z-30 py-2 rounded-xl border flex  items-center text-red-500 gap-2"
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
                className="absolute z-0 transition duration-150  right-0 -translate-y-1/2 top-1/2  flex justify-center items-center h-[32px] w-[32px] font-semibold text-sm rounded-full hover:bg-twitter-light "
              >
                <HiDotsHorizontal />
              </button>
            </div>
          )}
          {username != post.username && (
            <>
              <button className="transition duration-150 absolute right-0 -translate-y-1/2 top-1/2 cursor-not-allowed  flex justify-center items-center h-[32px] w-[32px] font-semibold text-sm rounded-full hover:bg-twitter-light ">
                <HiDotsHorizontal />
              </button>
            </>
          )}
        </div>
        {/* content */}
        <div className="text-wrap break-all pl-3">{post.content}</div>
        <div className="w-full  pl-3 py-2">
          {post.medialinks && post.medialinks[0] && (
            <div>
              {post.medialinks.map((link: string) => (
                <Image
                  key={link}
                  className="rounded-2xl w-full "
                  alt="image"
                  width={4080}
                  height={4080}
                  src={link}
                />
              ))}
            </div>
          )}
        </div>

        {/* footer */}
        <div className=" h-[32px]  ml-3  flex gap-[19%] items-center">
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
            className="flex items-center gap-1 w-[40px] "
          >
            <GoHeart className={liked ? "hidden" : "block"} />
            <GoHeartFill className={liked ? "block" : "hidden"} />
            <div
              id="likes"
              className={`text-sm ${like_count == 0 ? "opacity-0" : ""}`}
            >
              {like_count}
            </div>
          </button>
          {/* views */}
          <div>
            <IoStatsChart />
          </div>
          {/* bookmark & share */}
          <div className="flex  gap-3">
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

function PostBox({ posts, setPosts }: { posts: any[]; setPosts: any }) {
  const { data: session } = useSession();
  const [username] = useContext(context);
  const [showWhoCanReplyButton, setShowWhoCanReplyButton] = useState(false);
  const [postButtonDisabled, setPostButtonDisabled] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([] as any[]);
  const initialState = { error: null, message: "" };

  const [state, formAction] = useFormState(createPost, initialState);

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

  const uploadPhoto = (e: any) => {
    setSelectedFiles([...e.target.files]);
  };
  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles]);
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
          <textarea
            id="text-area"
            placeholder="What is happening?!"
            name="content"
            onFocus={() => setShowWhoCanReplyButton(true)}
            onInput={auto_grow}
            wrap="soft"
            className="placeholder:text-gray-600 w-full pl-2 my-2 placeholder:text-xl text-xl resize-none h-[30px] focus:outline-none overflow-hidden border-gray-300"
          ></textarea>
          <div>
            {selectedFiles.length > 0 &&
              selectedFiles.map((file) => {
                function CloseButton() {
                  const router = useRouter();
                  const handleClick = (e: any) => {
                    e.preventDefault();
                    const imageInput = document.getElementById(
                      "uploadImage"
                    ) as HTMLInputElement;
                    const filtered = selectedFiles.filter(
                      (f) => f.name != file.name
                    );
                    const newFileList = new DataTransfer();
                    filtered.forEach((f) => {
                      newFileList.items.add(f);
                    });
                    imageInput.files = newFileList.files;
                    setSelectedFiles(filtered);
                    console.log(imageInput.files);
                  };
                  return (
                    <button
                      onClick={handleClick}
                      className="flex justify-center text-white bg-black bg-opacity-60 items-center w-10 h-10 absolute right-2 top-2 rounded-full hover:bg-opacity-80 hover:bg-gray-800 transition duration-200"
                    >
                      <AiOutlineClose />
                    </button>
                  );
                }
                return (
                  <div className="relative" key={file.name}>
                    <CloseButton />
                    <img
                      className="rounded-2xl"
                      src={URL.createObjectURL(file)}
                    />
                  </div>
                );
              })}
          </div>
          <div
            className={` ${
              showWhoCanReplyButton ? "block" : "hidden"
            } h-[37px]`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="flex items-center px-3 gap-1 transition duration-150 cursor-not-allowed  rounded-full  hover:bg-twitter-light text-twitter font-semibold text-sm p-1"
            >
              <FaEarthAmericas />
              Everyone can reply
            </button>
          </div>
          <div className="relative h-[48px]  flex gap-2 items-center  ">
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
              <RiListRadio className="text-twitter text-xl" />
            </div>
            <div className="w-[34px] h-[34px] flex items-center justify-center rounded-full cursor-not-allowed hover:bg-twitter-light transition duration-150">
              <FaRegSmile className="text-twitter text-xl" />
            </div>
            <div className="w-[34px] h-[34px] flex items-center justify-center rounded-full cursor-not-allowed hover:bg-twitter-light transition duration-150">
              <TbCalendarTime className="text-twitter text-xl" />
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
