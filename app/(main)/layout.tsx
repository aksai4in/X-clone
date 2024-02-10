import SideNav from "../ui/home/side-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex">
      <SideNav />
      {children}
      <div className="w-full"></div>
    </div>
  );
}
