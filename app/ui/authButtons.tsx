"use client";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  const handleClick = () => {};
  return (
    <button
      onClick={handleClick}
      className={`flex w-80 hover:bg-gray-200 transition duration-200 py-2 items-center border border-gray-300 justify-center gap-2 my-2 rounded-full`}
    >
      <FcGoogle className="text-2xl" />
      <span className="text-1xl medium">Sign up with Google</span>
    </button>
  );
}
