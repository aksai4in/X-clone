import ProfilePage from "@/app/ui/profile/profilePage";

export default function Page({ params }: { params: { username: string } }) {
  const username = params.username;
  return <ProfilePage params={params} />;
}
