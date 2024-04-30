"use client";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
interface PlayerContentProps {
  song: Song;
  songUrl: string;
}
const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const Icon = true ? BsPauseFill : BsPlayFill;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full ">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex w-full justify-end pr-2 items-center col-auto ">
        <div
          onClick={() => {}}
          className="flex w-10 h-10 justify-center itmes-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon className="text-black" size={30} />
        </div>
      </div>
    </div>
  );
};
export default PlayerContent;
