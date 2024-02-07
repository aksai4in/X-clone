import { Suspense } from "react";
import SideNav from "../../ui/home/side-nav";
import Messages from "../../ui/messages/messages";
import Notifications from "../../ui/notifications/notifications";
import { PostFeedSceleton } from "@/app/ui/skeletons";

export default function Page() {
  return (
    <Suspense fallback={<PostFeedSceleton />}>
      <Messages />
    </Suspense>
  );
}
