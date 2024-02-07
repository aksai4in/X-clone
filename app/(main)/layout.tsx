import SideNav from "../ui/home/side-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideNav />
      {children}
    </div>
  );
}
