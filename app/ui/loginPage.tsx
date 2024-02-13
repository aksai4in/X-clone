"use client";
import Image from "next/image";
import Footer from "./footer";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { useState } from "react";
import { AppleButton, GoogleButton } from "./buttons";
import { LoginPageSceleton } from "./skeletons";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className=" flex flex-col h-screen relative">
      <div className="flex flex-row flex-grow items-center justify-center">
        <div className="md:flex-grow flex justify-center items-center">
          <Image
            src={
              "https://firebasestorage.googleapis.com/v0/b/twitter-clone-6871c.appspot.com/o/images%2Fpublic%2FX-Logo.png?alt=media&token=3cd9790c-c99f-4ca6-adc5-a98a6573a99e"
            }
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
            <GoogleButton name="Sign up with Google" />
            <AppleButton name="Sign up with Apple" />
            <span className={`w-80 flex justify-center`}>or</span>
            <Link
              onClick={() => {
                setLoading(true);
              }}
              href="/signup"
              className={`flex w-80 hover:bg-twitter-dark transition duration-200 py-2 items-center bg-twitter justify-center gap-2 my-2 rounded-full`}
            >
              <span className="text-1xl font-semibold text-white">
                Create account
              </span>
            </Link>
            <div className={`text-xs text-gray-500 w-80`}>
              <span>
                By signing up, you agree to the{" "}
                <Link
                  className="text-twitter hover:underline"
                  href="https://twitter.com/tos"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="https://twitter.com/privacy"
                  className="text-twitter hover:underline"
                >
                  Privacy Policy
                </Link>
                , including{" "}
                <Link
                  href="https://help.twitter.com/rules-and-policies/twitter-cookies"
                  className="text-twitter hover:underline"
                >
                  Cookie Use.
                </Link>
              </span>
            </div>
            <div>
              <span className="font-semibold">
                <br></br>
                <br></br>Already have an account?
              </span>
            </div>
            <Link
              onClick={() => {
                setLoading(true);
              }}
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
