import { create } from "zustand";

interface PlayeProps {
  ids: string[];
  activeid?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}
const usePlayer = create<PlayeProps>((set) => ({
  ids: [],
  activeid: undefined,
  setId: (id: string) => set({ activeid: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ activeid: undefined }),
}));

export default usePlayer;
