"use client";
import { FaXTwitter } from "react-icons/fa6";
import { AppleButton, CloseButton, GoogleButton } from "../buttons";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { ChangeEventHandler, FormEvent, Suspense, useState } from "react";
import { existsUserWithEmail } from "../../lib/actions";
import { setLazyProp } from "next/dist/server/api-utils";
import { LoginSceleton } from "../skeletons";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const handleNext = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const userExists = await existsUserWithEmail(
      formData.get("email") as string
    );
    setLoading(false);
    if (userExists) {
      setEmail(formData.get("email") as string);
    }
  };
  const handlePasswordChange = (e: any) => {
    if (e.target.value) {
      setPassword(e.target.value);
    } else {
      setPassword("");
    }
  };
  const changeVisibility = (e: any) => {
    e.preventDefault();
    setHidePassword(!hidePassword);
    setTimeout(function () {
      const passwordInput = document.getElementById(
        "password"
      ) as HTMLInputElement;

      passwordInput.setSelectionRange(
        passwordInput.value.length,
        passwordInput.value.length
      );
      passwordInput.focus();
    }, 0);
  };
  const login = async (e: any) => {
    e.preventDefault();
    await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/home",
    });
    console.log("login");
  };
  return (
    <>
      {loading && <LoginSceleton />}
      {!loading && (
        <>
          {email && (
            <div className="flex flex-col h-[644px] w-[600px]  bg-white rounded-2xl">
              {/* header */}
              <div className="relative flex h-[53px] items-center justify-center">
                <CloseButton />
                <FaXTwitter className="text-4xl" />
              </div>
              {/* body */}
              <div className=" flex flex-col h-full mx-20">
                <span className="my-10 text-4xl font-bold">
                  Enter your password
                </span>
                <form className="flex flex-col flex-grow">
                  <div className="relative py-2">
                    <input
                      disabled
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      className="peer text-[#A3A3A3] h-16 px-3 pt-[20px] w-full   placeholder-transparent focus:outline-none focus:border-twitter focus:ring-1 focus:ring-twitter rounded-md"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="email"
                      className="hover:cursor-text absolute left-3 top-[15px] text-[#A3A3A3] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-[15px] peer-focus:text-twitter peer-focus:text-sm"
                    >
                      Phone, email, or username
                    </label>
                  </div>
                  <div className="relative py-2">
                    <input
                      id="password"
                      name="password"
                      type={hidePassword ? "password" : "text"}
                      onChange={handlePasswordChange}
                      className="peer h-16 px-3 pt-[20px] w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-twitter focus:ring-1 focus:ring-twitter rounded-md"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="email"
                      className="hover:cursor-text absolute left-3 top-[15px] text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-[15px] peer-focus:text-twitter peer-focus:text-sm"
                    >
                      Password
                    </label>
                    <button
                      onClick={changeVisibility}
                      className="h-6 w-6 transition duration-200 hover:bg-gray-300 rounded-full absolute right-5 top-[30px]"
                    >
                      <IoEyeOutline
                        className={`text-2xl transition duration-200 ease-in-out ${
                          hidePassword ? "block" : "hidden"
                        }`}
                      />
                      <IoEyeOffOutline
                        className={`text-2xl transition duration-200 ease-in-out ${
                          hidePassword ? "hidden" : "block"
                        }`}
                      />
                    </button>

                    <span className=" cursor-not-allowed text-twitter text-sm hover:underline">
                      Forgot password?
                    </span>
                  </div>
                  <button
                    onClick={login}
                    disabled={!password}
                    className="disabled:bg-[#86898c] bottom-0 mt-auto flex w-full  text-white hover:bg-gray-800 transition duration-200 py-3 items-center bg-black justify-center gap-2 my-2 rounded-full"
                  >
                    Login
                  </button>
                </form>
                <div className="mt-4 mb-5">
                  <span>Don't have an account? </span>
                  <Link className="hover:underline text-twitter" href="/signUp">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          )}

          {!email && (
            <div className="flex flex-col h-[644px] w-[600px]  bg-white rounded-2xl">
              {/* header */}
              <div className="relative flex h-[53px] items-center justify-center">
                <CloseButton />
                <FaXTwitter className="text-4xl" />
              </div>
              {/* body */}
              <div className="flex h-[538px] border justify-center items-center">
                <div className="flex flex-col">
                  <h1 className="my-10 text-4xl font-bold">Sign in to X</h1>
                  <GoogleButton name="Sign in with Goolge" />
                  <AppleButton name="Sign in with Apple" />
                  <span className={`w-80 flex justify-center`}>or</span>

                  <form onSubmit={handleNext}>
                    <div className="relative py-2">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        className="peer h-16 px-3 pt-[20px] w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-twitter focus:ring-1 focus:ring-twitter rounded-md"
                        placeholder="john@doe.com"
                      />
                      <label
                        htmlFor="email"
                        className="hover:cursor-text absolute left-3 top-[15px] text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-[15px] peer-focus:text-twitter peer-focus:text-sm"
                      >
                        Phone, email, or username
                      </label>
                    </div>
                    <button className="flex w-80  text-white hover:bg-gray-800 transition duration-200 py-2 items-center bg-black justify-center gap-2 my-2 rounded-full">
                      Next
                    </button>
                  </form>
                  <button className=" cursor-not-allowed flex w-80 font-semibold hover:bg-gray-200 transition duration-200 py-2 items-center border border-gray-300 justify-center gap-2 my-2 rounded-full">
                    Forgot password?
                  </button>
                </div>
              </div>
              {/* footer */}
              <div></div>
            </div>
          )}
        </>
      )}
    </>
  );
}
