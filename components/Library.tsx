"use client";
import { Song } from "@/types";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import React from "react";
import MediaItem from "./MediaItem";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const { user } = useUser();
  const UploadModal = useUploadModal();
  const onclick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    return UploadModal.onOpen();
  };

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
        {songs.map((item) => (
          <MediaItem onClick={() => {}} key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Library;
