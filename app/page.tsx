import Image from "next/image";
import Footer from "./ui/footer";
import LoginOptions from "./ui/login-options";

export default function Home() {
  return (
    <div className=" flex flex-col h-screen relative">
      <div className="flex flex-row flex-grow items-center justify-center">
        <div className="md:w-1/2 flex justify-center items-center">
          <Image
            src={"/X-Logo.png"}
            className="hidden md:block "
            alt={"x logo"}
            width={336}
            height={336}
          />
        </div>
        <div className="md:w-1/2 flex  m-3 flex-col items-center justify-center">
          <div className="">
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
            <LoginOptions />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
