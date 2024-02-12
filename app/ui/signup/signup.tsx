"use client";
import { FaXTwitter } from "react-icons/fa6";
import { AppleButton, CloseButton, GoogleButton } from "../buttons";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { ChangeEventHandler, FormEvent, Suspense, useState } from "react";
import { createAccount, existsUserWithEmail } from "../../lib/actions";
import { setLazyProp } from "next/dist/server/api-utils";
import { LoginSceleton } from "../skeletons";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { signIn } from "next-auth/react";
import { IoMdArrowBack } from "react-icons/io";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [step, setStep] = useState(1);
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
  const handleNameChange = (e: any) => {
    if (e.target.value) {
      setName(e.target.value);
    } else {
      setName("");
    }
  };
  const handleEmailChange = (e: any) => {
    if (e.target.value) {
      setEmail(e.target.value);
    } else {
      setEmail("");
    }
  };
  const handleUsernameChange = (e: any) => {
    if (e.target.value) {
      setUsername(e.target.value);
    } else {
      setUsername("");
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
  const signup = async (e: any) => {
    e.preventDefault();
    await createAccount(name, email, password, username);
    await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/home",
    });
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
  const goToStep2 = () => {
    setStep(step + 1);
  };
  const goToStep3 = () => {
    setStep(step + 1);
  };
  function BackButton() {
    const handleClick = (e: any) => {
      e.stopPropagation();
      setStep(step - 1);
    };
    return (
      <button
        onClick={handleClick}
        className="flex ml-2 justify-center text-xl items-center w-10 h-10 absolute left-0 rounded-full hover:bg-gray-300 transition duration-200"
      >
        <IoMdArrowBack />
      </button>
    );
  }
  return (
    <>
      {loading && <LoginSceleton />}
      {!loading && (
        <>
          {step == 1 && (
            <div className="flex flex-col h-[644px] w-[600px]  bg-white rounded-2xl">
              {/* header */}
              <div className="relative flex h-[53px] items-center justify-center">
                <CloseButton />
                <FaXTwitter className="text-4xl" />
              </div>
              {/* body */}
              <div className=" flex flex-col h-full mx-20">
                <span className="my-10 text-4xl font-bold">
                  Create your account
                </span>
                <form className="flex flex-col flex-grow">
                  <div className="relative py-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      className="peer h-16 px-3 pt-[20px] w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-twitter focus:ring-1 focus:ring-twitter rounded-md"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="name"
                      className="hover:cursor-text absolute left-3 top-[15px] text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-[15px] peer-focus:text-twitter peer-focus:text-sm"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative py-2">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      onChange={handleEmailChange}
                      className="peer h-16 px-3 pt-[20px] w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-twitter focus:ring-1 focus:ring-twitter rounded-md"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="email"
                      className="hover:cursor-text absolute left-3 top-[15px] text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-[15px] peer-focus:text-twitter peer-focus:text-sm"
                    >
                      Email
                    </label>
                  </div>

                  <button
                    onClick={goToStep2}
                    disabled={!email || !name}
                    className="disabled:bg-[#86898c] mb-6 bottom-0 mt-auto flex w-full  text-white hover:bg-gray-800 transition duration-200 py-3 items-center bg-black justify-center gap-2 my-2 rounded-full"
                  >
                    Next
                  </button>
                </form>
              </div>
            </div>
          )}

          {step == 2 && (
            <div className="flex flex-col h-[644px] w-[600px]  bg-white rounded-2xl">
              {/* header */}
              <div className="relative flex h-[53px] items-center justify-center">
                <BackButton />
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
                      id="password"
                      name="password"
                      value={password}
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
                    onClick={goToStep3}
                    disabled={!password}
                    className="disabled:bg-[#86898c] mb-6  bottom-0 mt-auto flex w-full  text-white hover:bg-gray-800 transition duration-200 py-3 items-center bg-black justify-center gap-2 my-2 rounded-full"
                  >
                    Next
                  </button>
                </form>
              </div>
            </div>
          )}
          {step == 3 && (
            <div className="flex flex-col h-[644px] w-[600px]  bg-white rounded-2xl">
              {/* header */}
              <div className="relative flex h-[53px] items-center justify-center">
                <BackButton />
                <FaXTwitter className="text-4xl" />
              </div>
              {/* body */}
              <div className=" flex flex-col h-full mx-20">
                <span className="my-10 text-4xl font-bold">
                  Choose your username
                </span>
                <form className="flex flex-col flex-grow">
                  <div className="relative py-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      onChange={handleUsernameChange}
                      className="peer h-16 px-3 pt-[20px] w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-twitter focus:ring-1 focus:ring-twitter rounded-md"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="name"
                      className="hover:cursor-text absolute left-3 top-[15px] text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-[15px] peer-focus:text-twitter peer-focus:text-sm"
                    >
                      Username
                    </label>
                  </div>
                  <button
                    onClick={signup}
                    disabled={!username}
                    className="disabled:bg-[#86898c] mb-6 bottom-0 mt-auto flex w-full  text-white hover:bg-gray-800 transition duration-200 py-3 items-center bg-black justify-center gap-2 my-2 rounded-full"
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
