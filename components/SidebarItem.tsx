import { IconNode, LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: LucideIcon;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `h-auto w-full px-2 cursor-pointer py-2 transition-color flex rounded-md justify-center  text-neutral-800`,
        active &&
          "text-neutral-100 bg-indigo-500 border-2 shadow-md  transition-transform   bg-clip-padding  border-gray-100 backdrop-filter backdrop-blur-lg bg-opacity-90 "
      )}
    >
      <Icon size={25} className="" />
    </Link>
  );
};

export default SidebarItem;
