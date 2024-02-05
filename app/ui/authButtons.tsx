"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function GoogleButton({ name }: { name: String }) {
  const router = useRouter();
  const handleClick = async () => {
    await signIn("google");
  };
  return (
    <button
      onClick={handleClick}
      className={`flex w-80 hover:bg-gray-200 transition duration-200 py-2 items-center border border-gray-300 justify-center gap-2 my-2 rounded-full`}
    >
      <FcGoogle className="text-2xl" />
      <span className="text-1xl medium">{name}</span>
    </button>
  );
}

export function AppleButton({ name }: { name: String }) {
  return (
    <Link
      href="/api/callback/google"
      className={`flex w-80 hover:bg-gray-200 transition duration-200 py-2 items-center border border-gray-300 justify-center gap-2 my-2 rounded-full`}
    >
      <FaApple className="text-2xl" />
      <span className="text-1xl font-semibold">{name}</span>
    </Link>
  );
}

export function CloseButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
    router.refresh();
  };
  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center w-10 h-10 absolute left-2 rounded-full hover:bg-gray-300 transition duration-200"
    >
      <AiOutlineClose />
    </button>
  );
}
