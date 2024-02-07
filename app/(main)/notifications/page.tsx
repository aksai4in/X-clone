import { Suspense } from "react";
import SideNav from "../../ui/home/side-nav";
import Notifications from "../../ui/notifications/notifications";
import { PostFeedSceleton } from "@/app/ui/skeletons";

export default function Page() {
  return (
    <Suspense fallback={<PostFeedSceleton />}>
      <Notifications />
    </Suspense>
  );
}
