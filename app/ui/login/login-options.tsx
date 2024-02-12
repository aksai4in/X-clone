import Link from "next/link";
import { FaApple } from "react-icons/fa";
import { AppleButton, GoogleButton } from "../buttons";
import Modal from "../modal";
type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function LoginOptions() {
  return (
    <>
      <GoogleButton name="Sign up with Google" />
      <AppleButton name="Sign up with Apple" />
      <span className={`w-80 flex justify-center`}>or</span>
      <Link
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
        href="/login"
        className={`flex w-80 hover:bg-twitter-light transition duration-200 py-2 items-center border border-gray-300 justify-center gap-2 my-2 rounded-full`}
      >
        <span className="text-1xl font-semibold text-twitter">Sign in</span>
      </Link>
    </>
  );
}
