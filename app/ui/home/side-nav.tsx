import { EnvelopeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { GoBookmark, GoHomeFill, GoMail, GoSearch } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { LuMail } from "react-icons/lu";
import { PiDotsThreeCircle } from "react-icons/pi";
import { VscBell } from "react-icons/vsc";
import FeatherIcon from "../custom-icon";
import { FaXTwitter } from "react-icons/fa6";
export default function SideNav() {
  const sideNavLinks = [
    { name: "Home", url: "/home", icon: GoHomeFill },
    {
      name: "Explore",
      url: "/explore",
      icon: GoSearch,
    },
    {
      name: "Notifications",
      url: "/notifications",
      icon: VscBell,
    },
    {
      name: "Messages",
      url: "/messages",
      icon: GoMail,
    },
    {
      name: "Bookmarks",
      url: "/bookmarks",
      icon: GoBookmark,
    },
    {
      name: "Profile",
      url: "/profile",
      icon: BsPerson,
    },
    {
      name: "More",
      url: "/more",
      icon: PiDotsThreeCircle,
    },
  ];
  return (
    <div className=" w-1/4 flex justify-end border">
      <div className="border flex flex-col">
        <div className="border w-[150px]">
          <Link
            href={encodeURI("/home")}
            className="w-[50px] h-[50px] flex border group justify-center items-center"
          >
            <div className="flex w-[50px] h-[50px] group-hover:bg-gray-300 px-2 transition duration-200 py-2 items-center border border-gray-300 justify-center gap-4 my-2 rounded-full">
              <FaXTwitter className="text-2xl" />
            </div>
          </Link>
          <div className="flex flex-col">
            {sideNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  href={encodeURI(link.url)}
                  className="w-[50px] h-[50px] xl:w-[150px] flex border group xl:justify-start justify-center items-center"
                >
                  <div className="flex group-hover:bg-gray-300 px-2 transition duration-200 py-2 items-center border border-gray-300 justify-center gap-4 my-2 rounded-full">
                    <Icon className="text-2xl" />
                    <span className="hidden xl:block">{link.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <button
            className={`flex xl:w-[150px] w-[50px] h-[50px] bg-twitter hover:bg-twitter-dark transition duration-200 py-2 items-center border border-gray-300 justify-center gap-2 my-2 rounded-full`}
          >
            <FeatherIcon />
            <span className="text-1xl xl:block md:hidden font-semibold text-white">
              Post
            </span>
          </button>
        </div>
        <div className="mt-auto ">
          <button
            className={`flex w-[150px] h-[50px] hover:bg-gray-300 transition duration-200 py-2 items-center border border-gray-300 justify-center gap-2 my-2 rounded-full`}
          >
            <div className="border flex flex-col justify-center items-start">
              <span className="text-1xl xl:block md:hidden font-semibold ">
                Name
              </span>
              <span className=" xl:block md:hidden">@username</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
