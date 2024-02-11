import PostPage from "@/app/ui/profile/postPage";

export default function Page({
  params,
}: {
  params: { username: string; post_id: number };
}) {
  const post_id = params.post_id;
  return (
    <div className="min-w-[600px] border ">
      <PostPage params={params} />
    </div>
  );
}
