"use client";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeid);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !songUrl) {
    return null;
  }
  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      PLAYER
    </div>
  );
};
export default Player;
