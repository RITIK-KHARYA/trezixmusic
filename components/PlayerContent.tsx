"use client";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import Slider from "./Slider";

import useSound from "use-sound";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import usePlayer from "@/hooks/usePlayer";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useEffect, useState } from "react";
interface PlayerContentProps {
  song: Song;
  songUrl: string;
}
const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setvolume] = useState(1);
  const [isplaying, setisplaying] = useState(false);
  const Icon = isplaying ? BsPauseFill : BsPlayFill;
  console.log(player.ids);
  console.log(songUrl);
  console.log(player.activeid);
  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeid);

    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeid);

    const previosSong = player.ids[currentIndex - 1];

    if (!previosSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(previosSong);
  };
  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setisplaying(true),
    onpause: () => setisplaying(false),
    onend: () => {
      setisplaying(false);
      onPlayNext();
    },
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    console.log("play");
    if (!isplaying) {
      play();
    } else {
      pause();
    }
  };
  const toggleMute = () => {
    if (volume === 0) {
      setvolume(1);
    } else {
      setvolume(0);
    }
  };

  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full ">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="md:hidden flex w-full justify-end  items-center  ">
        <div
          onClick={handlePlay}
          className="flex w-10 h-10 justify-center items-center rounded-full bg-white p-1 cursor-pointer "
        >
          <Icon className="text-black" size={25} />
        </div>
      </div>
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          size={25}
          onClick={onPlayPrevious}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          size={25}
          onClick={onPlayNext}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider
            value={volume}
            onChange={(value) => {
              setvolume(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default PlayerContent;
