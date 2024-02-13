"use client";
import { getUserByEmail } from "@/app/lib/actions";
import Avatar from "@mui/material/Avatar";
import { signOut, useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { set } from "zod";
import { context } from "../mainLayout";

export default function ProfileButton() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useContext(context);

  const logout = () => {
    signOut();
  };
  const handleClick = () => {
    setShowMenu(true);
  };
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (showMenu && !event.target.closest(".my-element")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="relative ">
      <button
        onClick={handleClick}
        className={`flex px-3 w-[64px] xl:w-[240px] h-[64px] hover:bg-gray-200 transition duration-200 py-2 items-center  border-gray-300  gap-2 my-2 rounded-full`}
      >
        <Avatar
          sx={{ width: 42, height: 42 }}
          alt="avatar"
          src={session?.user?.image as string}
        />
        <div className="flex flex-col justify-start">
          <span className="text-1xl text-sm xl:block md:hidden font-semibold ">
            {session?.user?.name}
          </span>
          <span className="text-sm text-left text-gray-500 xl:block md:hidden">
            @{username}
          </span>
        </div>
        <HiDotsHorizontal className="ml-2 hidden xl:block" />
      </button>
      {showMenu && (
        <div
          className={`my-element z-11 bg-white  border absolute shadow-lg py-3 rounded-xl w-[280px] -top-32 -translate-x-1/2 left-1/2 `}
        >
          <button className="py-2 cursor-not-allowed text-left font-semibold w-full hover:bg-gray-100 px-3 transition duration-200">
            Add existing account
          </button>
          <button
            className="py-2 text-left font-semibold w-full hover:bg-slate-100 px-3 transition duration-200"
            onClick={logout}
          >
            Log out @{username}
          </button>
        </div>
      )}
    </div>
  );
}
