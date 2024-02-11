import { getBookmarkedPostIds, getUserByEmail } from "@/app/lib/actions";
import Bookmarks from "../../ui/bookmarks/bookmarks";
import SideNav from "../../ui/home/side-nav";
import Messages from "../../ui/messages/messages";
import Notifications from "../../ui/notifications/notifications";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  return <Bookmarks />;
}
