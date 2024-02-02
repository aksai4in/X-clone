import Link from "next/link";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
export default function LoginOptions() {
  return (
    <div>
      <button
        className={`flex w-80 hover:bg-gray-200 transition duration-200 py-2 items-center border border-gray-300 justify-center gap-2 my-2 rounded-full`}
      >
        <FcGoogle className="text-2xl" />
        <span className="text-1xl medium">Sign up with Google</span>
      </button>
      <button
        className={`flex w-80 hover:bg-gray-200 transition duration-200 py-2 items-center border border-gray-300 justify-center gap-2 my-2 rounded-full`}
      >
        <FaApple className="text-2xl" />
        <span className="text-1xl font-semibold">Sign up with Apple</span>
      </button>
      <span className={`w-80 flex justify-center`}>or</span>
      <button
        className={`flex w-80 hover:bg-twitter-dark transition duration-200 py-2 items-center bg-twitter justify-center gap-2 my-2 rounded-full`}
      >
        <span className="text-1xl font-semibold text-white">
          Create sccount
        </span>
      </button>
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
      <button
        className={`flex w-80 hover:bg-twitter-light transition duration-200 py-2 items-center border border-gray-300 justify-center gap-2 my-2 rounded-full`}
      >
        <span className="text-1xl font-semibold text-twitter">Sign in</span>
      </button>
    </div>
  );
}
