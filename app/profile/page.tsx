import SideNav from "../ui/home/side-nav";
import Messages from "../ui/messages/messages";
import Notifications from "../ui/notifications/notifications";

export default function Page() {
  return (
    <div className="flex h-screen">
      <SideNav />
      <Messages />

      <div></div>
    </div>
  );
}
