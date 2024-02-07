import Image from "next/image";
import SideNav from "../../ui/home/side-nav";
import FeatherIcon from "../../ui/custom-icon";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Feed from "../../ui/home/feed";
import { fetchPosts } from "../../lib/data";

export default async function Home() {
  // const posts = await fetchPosts();
  return (
    <Feed
    // posts={posts}
    />
  );
}
