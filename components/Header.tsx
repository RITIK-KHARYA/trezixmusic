"use client";
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
  classname?: string;
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children, classname }) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const SupabaseClient = useSupabaseClient();
  const { user } = useUser();
  console.log(user);

  const handleLogout = async () => {
    const { error } = await SupabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else toast.success("Logged out");
  };

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        classname
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 item-center">
          <button
            onClick={() => router.back()}
            className="bg-black rounded-full flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} className="text" />
          </button>

          <button
            onClick={() => router.forward()}
            className="bg-black rounded-full flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>

        <div className="md:hidden gap-x-2 item-center flex">
          <button className="rounded-full bg-white item-center hover:opacity-75 transition p-2 justify-center">
            <HiHome className="text-black" size={20} />
          </button>

          <button className="rounded-full bg-white item-center hover:opacity-75 transition p-2 justify-center">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-center item-center gap-x-2">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/profile")}
                className="bg-white rounded-full px-3 py-3"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-black text-white px-6 py-2 "
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-white text-black px-6 py-1.5"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
