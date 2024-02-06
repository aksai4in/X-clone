"use client";
import Image from "next/image";
import { useState } from "react";

export default function Feed() {
  const [contentType, setContentType] = useState(1);
  return (
    <div className="relative border border-l-0 w-full max-w-[600px]">
      <div className="absolute top-0 z-1 w-full border-b-[1px] flex bg-white bg-opacity-10 backdrop-blur">
        <button
          onClick={() => {
            setContentType(1);
          }}
          className="hover:bg-opacity-30 hover:backdrop-blur hover:bg-gray-300 transition duration-150  h-[53px] w-[50%] flex items-center justify-center"
        >
          <div
            className={`${
              contentType == 1 ? "" : " text-neutral-500 "
            } font-semibold text-sm relative h-full  flex items-center `}
          >
            For you
            <div
              className={`${
                contentType == 1 ? "block" : "hidden"
              } absolute bottom-0 w-full h-1 bg-twitter rounded-full`}
            ></div>
          </div>
        </button>
        <button
          onClick={() => {
            setContentType(2);
          }}
          className="hover:bg-opacity-30 hover:backdrop-blur hover:bg-gray-300 transition duration-150  h-[53px] w-1/2 flex items-center justify-center "
        >
          <div
            className={`${
              contentType == 2 ? "" : " text-neutral-500 "
            } font-semibold text-sm relative h-full  flex items-center `}
          >
            Following
            <div
              className={`${
                contentType == 2 ? "block" : "hidden"
              } absolute bottom-0 w-full h-1 bg-twitter rounded-full`}
            ></div>
          </div>
        </button>
      </div>
      <div
        className="h-full w-full z-0 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="h-[53px] w-full z-0"></div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
        <div className="h-53 w-full z-0">empty div</div>
      </div>
    </div>
  );
}
