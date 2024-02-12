"use client";
import { FaXTwitter } from "react-icons/fa6";
import { BackButton } from "../ui/buttons";
import { useEffect, useState } from "react";
import { getUser, getUserByEmail, insertUsername } from "../lib/actions";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function SetUsernamePage() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const handleUsernameChange = (e: any) => {
    if (e.target.value) {
      setUsername(e.target.value);
    } else {
      setUsername("");
    }
  };
  const router = useRouter();

  const updateUsername = () => {
    insertUsername(
      session?.user?.name as string,
      session?.user?.email as string,
      session?.user?.image as string,
      username
    ).then((res) => {
      if (res) {
        router.push("/home");
      } else {
        setError("username has been taken");
      }
    });
  };
  return (
    <div
      // ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 p-10"
      // onClick={onClick}
    >
      <div
        // ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 p-6"
      >
        <div className="flex flex-col h-[644px] w-[600px]  bg-white rounded-2xl">
          {/* header */}
          <div className="relative flex h-[53px] items-center justify-center">
            <FaXTwitter className="text-4xl" />
          </div>
          {/* body */}
          <div className=" flex flex-col h-full mx-20">
            <span className="my-10 text-4xl font-bold">
              Choose your username
            </span>
            <form className="flex flex-col flex-grow">
              <div className="relative py-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={handleUsernameChange}
                  className="peer h-16 px-3 pt-[20px] w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-twitter focus:ring-1 focus:ring-twitter rounded-md"
                  placeholder="john@doe.com"
                />
                <label
                  htmlFor="name"
                  className="hover:cursor-text absolute left-3 top-[15px] text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-[15px] peer-focus:text-twitter peer-focus:text-sm"
                >
                  Username
                </label>
              </div>
              <div className="text-red text-sm">{error}</div>
              <button
                onClick={updateUsername}
                disabled={!username}
                className="disabled:bg-[#86898c] mb-6 bottom-0 mt-auto flex w-full  text-white hover:bg-gray-800 transition duration-200 py-3 items-center bg-black justify-center gap-2 my-2 rounded-full"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
