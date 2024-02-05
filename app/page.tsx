import Image from "next/image";
import Footer from "./ui/footer";
import LoginOptions from "./ui/login-options";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Home({ searchParams }: SearchParamProps) {
  return (
    <div className=" flex flex-col h-screen relative">
      <div className="flex flex-row flex-grow items-center justify-center">
        <div className="md:flex-grow flex justify-center items-center">
          <Image
            src={"/X-Logo.png"}
            className="hidden md:block"
            alt={"x logo"}
            width={355}
            height={355}
          />
        </div>

        <div className="md:min-w-[615px] xl:mr-20 max-w-[660px] flex m-4 flex-col">
          <div className="m-5">
            <div>
              <Image
                src={"/X-Logo.png"}
                className="block md:hidden"
                alt={"x logo"}
                width={40}
                height={40}
              />
            </div>

            <div className="my-16">
              <h1 className="text-7xl font-bold break-all">Happening now</h1>
            </div>
            <div className="my-8">
              <h2 className="text-4xl font-bold">Join today.</h2>
            </div>
            <LoginOptions searchParams={searchParams} />
            <Link
              href="/login"
              className={`flex w-80 hover:bg-twitter-light transition duration-200 py-2 items-center border border-gray-300 justify-center gap-2 my-2 rounded-full`}
            >
              <span className="text-1xl font-semibold text-twitter">
                Sign in
              </span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
