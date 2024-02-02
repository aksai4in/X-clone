import Image from "next/image";
import SideNav from "../ui/home/side-nav";
import FeatherIcon from "../ui/custom-icon";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Feed from "../ui/home/feed";

export default function Home() {
  return (
    <div className="flex h-screen">
      <SideNav />
      <Feed />

      <div></div>
    </div>
  );
}
