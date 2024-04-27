import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "@/types";

const useLoadImage = (song: Song) => {
  const SupabaseClient = useSupabaseClient();

  if (!song) {
    return null;
  }

  const { data: imageData } = SupabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
