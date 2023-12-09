"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { LogOutIcon, MessagesSquare, UserIcon, UserPlus2Icon } from "lucide-react";

import SidebarItem from "./SidebarItem";
import Box from "./Box";
import { getSession } from "next-auth/react";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [id, setId] = useState<string | undefined>("");
  const [profileIcon, setProfileIcon] = useState<string | undefined>("");
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();

      setId(session?.user.id);

      try {
        const response = await fetch(`/api/getUser/${id}`);
        const data = await response.json();
        const profileImage = data.profileIcon;

        if (response.status === 200) {
          setProfileIcon(profileImage);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [id]);

  // console.log(profileIcon);

  const routes = useMemo(
    () => [
      {
        icon: MessagesSquare,
        active: pathname !== "/add" && pathname !== "/profile",
        href: "/",
        label: "Home",
      },
      {
        icon: UserPlus2Icon,
        active: pathname !== "/profile" && pathname !== "/",
        href: "/add",
        label: "Add",
      },
    ],
    [pathname]
  );
  return pathname !== "/login" && pathname !== "/completeProfile" ? (
    <>
      <div className="h-screen ">
        <div className="flex h-full">
          <div className=" sm:flex  hidden   flex-col gap-y-10 bg-indigo- h-full w-[100px] p-2">
            <div className="bg-gradient-to-b flex   flex-col rounded-lg h-full from-blue-200 to bg-indigo-300">
              <Box className="flex flex-col ">
                <div>
                  <Image
                    src={"/images/Logo.png"}
                    alt="Logo"
                    width={100}
                    className="cursor-pointer"
                    height={100}
                  />
                  <div className="flex flex-col gap-y-10 px-4 py-4 ">
                    {routes.map((item) => (
                      <SidebarItem key={item.label} {...item} />
                    ))}
                  </div>
                </div>
              </Box>
              <div className="flex flex-col items-center justify-center py-5 space-y-12  ">
                <div className="w-12 h-12 rounded-full ">
                  {profileIcon ? <img src={profileIcon} alt="description" className="rounded-full" /> : <UserIcon size={35}/>
}
                </div>

                <LogOutIcon
                  size={25}
                  className="cursor-pointer text-neutral-800"
                />
               </div>
            </div>
          </div>
          <main className="h-full flex-1 overflow-y-auto py-2  px-2 ">{children}</main>
        </div>
      </div>
    </>
  ) : (
    <main>{children}</main>
  );
};

export default Sidebar;
