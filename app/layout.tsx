import 'dotenv/config'
import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

import Sidebar from "@/components/Sidebar";
import MainLayout from "@/components/MainLayout";

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CubeChat",
  description: "Simple chat app for you",
  icons: {
    icon: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-indigo-100 h-full">
      <body className={rajdhani.className}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
