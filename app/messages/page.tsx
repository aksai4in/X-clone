import SideNav from "../ui/home/side-nav";
import Messages from "../ui/messages/messages";
import Notifications from "../ui/notifications/notifications";
import Profile from "../ui/profile/profile";

export default function Page() {
  return (
    <div className="flex h-screen">
      <SideNav />
      <Profile />

      <div></div>
    </div>
  );
}
