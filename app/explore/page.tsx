import Explore from "../ui/explore/explore";
import SideNav from "../ui/home/side-nav";

export default function Page() {
  return (
    <div className="flex h-screen">
      <SideNav />
      <Explore />

      <div></div>
    </div>
  );
}
