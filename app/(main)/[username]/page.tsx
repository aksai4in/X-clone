export default function Page({ params }: { params: { username: string } }) {
  const username = params.username;
  return (
    <div className="min-w-[600px] border ">porfile page of {username}</div>
  );
}
