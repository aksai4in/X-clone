import Link from "next/link";

export default function LoginLink({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  return (
    <Link
      className="hover:underline whitespace-nowrap text-xs text-gray-500 ml-2 mr-2 mt-1 mb-1"
      href={encodeURI(url)}
    >
      {name}
    </Link>
  );
}
