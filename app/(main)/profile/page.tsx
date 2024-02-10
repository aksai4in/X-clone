import { Suspense } from "react";
import SideNav from "../../ui/home/side-nav";
import Messages from "../../ui/messages/messages";
import Notifications from "../../ui/notifications/notifications";
import { PostFeedSceleton } from "@/app/ui/skeletons";
import Profile from "@/app/ui/profile/profile";

export default function Page() {
  return <Profile />;
}
