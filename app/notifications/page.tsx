import SideNav from "../ui/home/side-nav";
import Notifications from "../ui/notifications/notifications";

export default function Page() {
  return (
    <div className="flex h-screen">
      <SideNav />
      <Notifications />

      <div></div>
    </div>
  );
}
