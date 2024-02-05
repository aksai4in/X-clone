import Image from "next/image";

export default function LoginSceleton() {
  return (
    <div className="flex flex-col h-[644px] w-[600px]  bg-white rounded-2xl justify-center items-center">
      <Image src="/loading-gif.gif" alt="loading" height={50} width={50} />
    </div>
  );
}
