"use client";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { FaRegBookmark, FaRegUser, FaUser } from "react-icons/fa";
import {
  GoBookmark,
  GoHome,
  GoHomeFill,
  GoMail,
  GoSearch,
} from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { LuMail, LuSearch } from "react-icons/lu";
import { PiDotsThreeCircle } from "react-icons/pi";
import { VscBell } from "react-icons/vsc";
import FeatherIcon from "../custom-icon";
import { FaXTwitter } from "react-icons/fa6";
import ProfileButton from "./profile-button";
import { usePathname } from "next/navigation";
import {
  HiBell,
  HiBookmark,
  HiHome,
  HiMail,
  HiOutlineBell,
  HiOutlineBookmark,
  HiOutlineDotsCircleHorizontal,
  HiOutlineHome,
  HiOutlineMail,
  HiOutlineSearch,
  HiOutlineUser,
  HiSearch,
  HiUser,
} from "react-icons/hi";
const ACTIVE_ROUTE = "font-bold";
const INACTIVE_ROUTE = "";
export default function SideNav() {
  const pathname = usePathname();
  const sideNavLinks = [
    { name: "Home", url: "/home", icon1: HiOutlineHome, icon2: HiHome },
    {
      name: "Explore",
      url: "/explore",
      icon1: HiOutlineSearch,
      icon2: HiSearch,
    },
    {
      name: "Notifications",
      url: "/notifications",
      icon1: HiOutlineBell,
      icon2: HiBell,
    },
    {
      name: "Messages",
      url: "/messages",
      icon1: HiOutlineMail,
      icon2: HiMail,
    },
    {
      name: "Bookmarks",
      url: "/bookmarks",
      icon1: HiOutlineBookmark,
      icon2: HiBookmark,
    },
    {
      name: "Profile",
      url: "/profile",
      icon1: HiOutlineUser,
      icon2: HiUser,
    },
    {
      name: "More",
      url: "/more",
      icon1: HiOutlineDotsCircleHorizontal,
      icon2: HiOutlineDotsCircleHorizontal,
    },
  ];
  return (
    <div className="sticky top-0 min-w-[72px] border w-full h-screen flex justify-end ">
      <div className="sticky top-0 h-screen flex flex-col">
        <div className=" xl:w-[250px]">
          <Link
            href={encodeURI("/home")}
            className="w-[50px] h-[50px] flex  group justify-center items-center"
          >
            <div className="flex w-[50px] h-[50px] group-hover:bg-gray-200 px-2 transition duration-200 py-2 items-center  border-gray-300 justify-center gap-4 my-2 rounded-full">
              <FaXTwitter className="text-3xl" />
            </div>
          </Link>
          <div className="flex flex-col">
            {sideNavLinks.map((link) => {
              const Icon = link.icon1;
              const IconBold = link.icon2;

              const path = link.url;
              console.log(pathname, path);
              return (
                <Link
                  key={link.name}
                  href={encodeURI(link.url)}
                  className="w-[50px] h-[50px] xl:w-full flex group xl:justify-start justify-center items-center"
                >
                  <div
                    className={`${
                      pathname == path ? ACTIVE_ROUTE : INACTIVE_ROUTE
                    } flex group-hover:bg-gray-200 pl-2 pr-6 transition duration-150 py-2 items-center  border-gray-300 justify-center gap-4 my-2 rounded-full`}
                  >
                    <Icon
                      className={`${
                        pathname != path ? "block" : "hidden"
                      } text-3xl`}
                    />
                    <IconBold
                      className={`${
                        pathname == path ? "block" : "hidden"
                      } text-3xl`}
                    />
                    <span className={` text-xl hidden xl:block`}>
                      {link.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <button
            className={`flex w-[50px] xl:w-[220px] h-[50px] bg-twitter hover:bg-twitter-dark transition duration-200 py-2 items-center  border-gray-300 justify-center gap-2 my-2 rounded-full`}
          >
            <FeatherIcon />
            <span className="text-1xl xl:block md:hidden font-semibold text-white">
              Post
            </span>
          </button>
        </div>
        <div className=" mt-auto ">
          <ProfileButton />
        </div>
      </div>
    </div>
  );
}
