import Image from "next/image";

export function LoginSceleton() {
  return (
    <div className="flex flex-col h-[644px] w-[600px]  bg-white rounded-2xl justify-center items-center">
      <Image src="/loading-gif.gif" alt="loading" height={50} width={50} />
    </div>
  );
}

export function PostFeedSceleton() {
  return (
    <div>
      <div className="h-[53px] w-full z-0"></div>
      <div className="flex w-full h-full flex-col bg-white rounded-2xl justify-start items-center">
        <Image src="/loading-gif.gif" alt="loading" height={50} width={50} />
      </div>
    </div>
  );
}

export function LoginPageSceleton() {
  return (
    <div className="flex flex-col h-[300px] w-[300px]  bg-white rounded-2xl justify-center items-center">
      <Image src="/loading-gif.gif" alt="loading" height={50} width={50} />
    </div>
  );
}
