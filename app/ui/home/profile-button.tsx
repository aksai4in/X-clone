"use client";
import Avatar from "@mui/material/Avatar";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

export default function ProfileButton() {
  const { data: data } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  console.log(data?.user);
  const logout = () => {
    signOut();
  };
  const handleClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`flex px-3 w-[64px] xl:w-[240px] h-[64px] hover:bg-gray-200 transition duration-200 py-2 items-center  border-gray-300  gap-2 my-2 rounded-full`}
      >
        <Avatar
          sx={{ width: 35, height: 35 }}
          alt="avatar"
          src={data?.user?.image as string}
        />
        <div className="">
          <span className="text-1xl xl:block md:hidden font-semibold ">
            {data?.user?.name}
          </span>
          <span className="text-sm text-left text-gray-500 xl:block md:hidden">
            @username
          </span>
        </div>
        <HiDotsHorizontal className="ml-2 hidden xl:block" />
      </button>
      {showMenu && (
        <div
          className={`z-10 bg-white border absolute shadow-lg py-3 rounded-xl w-[300px] -top-32 -left-[30px]`}
        >
          <button className="py-2 cursor-not-allowed text-left font-semibold w-full hover:bg-gray-100 px-3 transition duration-200">
            Add existing account
          </button>
          <button
            className="py-2 text-left font-semibold w-full hover:bg-slate-100 px-3 transition duration-200"
            onClick={logout}
          >
            Log out @username
          </button>
        </div>
      )}
    </div>
  );
}
