import Image from "next/image";
import Footer from "./ui/footer";
import LoginOptions from "./ui/login/login-options";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Home({ searchParams }: SearchParamProps) {
  const session = await getServerSession();
  if (session?.user?.name) {
    redirect("/home");
  }
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
