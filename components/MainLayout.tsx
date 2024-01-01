'use client'
import React from "react";
import Sidebar from "./Sidebar";
import ChatLayout from "./ChatLayout";
import { usePathname } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  return pathname !== "/login" && pathname !== "/completeProfile" ? (
    <div className="flex h-screen ">
      <Sidebar />
      <ChatLayout />
      <main className="flex-1 h-full overflow-y-auto py-1 px-2">
        {children}
      </main>
    </div>
  ) : (
    <main className="flex-1 h-full overflow-y-auto py-2 px-2">{children}</main>
  );
};

export default MainLayout;
