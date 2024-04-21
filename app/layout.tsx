import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProviders";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
