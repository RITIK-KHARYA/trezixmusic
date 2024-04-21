"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

const Library = () => {
  const onclick = () => {};
  return (
    <div className="flex flex-col">
      <div
        className="
            flex
            items-center
            justify-between
            px-5
            pt-4"
      >
        <div
          className="
        inline-flex
        items-center
        gap-x-2
        text-sm
        font-medium
        text-gray-500
        dark:text-gray-400
        "
        >
          <TbPlaylist className="text-neutral-400" size={26} />
          <p
            className="text-neutral-400
          font-medium text-md"
          >
            Your Library!
          </p>
        </div>
        <AiOutlinePlus
          onClick={onclick}
          size={26}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div
        className="flex
      flex-col
      gap-y-2 mt-4 px-3"
      >
        List Of Songs
      </div>
    </div>
  );
};

export default Library;
