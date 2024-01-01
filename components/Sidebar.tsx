"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { getSession, signOut } from "next-auth/react";

import {
  LogOutIcon,
  MessagesSquare,
  UserIcon,
  UserPlus2Icon,
  Users,
} from "lucide-react";

import SidebarItem from "./SidebarItem";
import Box from "./Box";
import Button from "./ui/Button";
import toast from "react-hot-toast";
import { fetchRedis } from "@/helpers/redis";
import { Session } from "next-auth";
import FriendRequestSidebarItem from "./FriendRequestSidebarItem";

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [id, setId] = useState<string | undefined>("");
  const [profileIcon, setProfileIcon] = useState<string | undefined>("");
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(0);
  const [session,setSession] = useState <Session | null>(null)

  const pathname = usePathname();
  const router = useRouter();

  
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({callbackUrl:'/login'});
     
    } catch (error) {
      toast.error('There was an error in the sign-out process')
    } finally {
      setIsSigningOut(false);
    }
  };
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

  const routes = useMemo(
    () => [
      {
        icon: MessagesSquare,
        active: pathname !== "/add" && pathname !== "/profile" && pathname !== '/friends',
        href: "/",
        label: "Home",
      },
      {
        icon: UserPlus2Icon,
        active: pathname !== "/profile" && pathname !== "/" && pathname !== '/friends',
        href: "/add",
        label: "Add",
      },
      // {
      //   icon: Users,
      //   active: pathname !== "/profile" && pathname !== "/" && pathname !== '/add',
      //   href:'/friends',
      //   label:'Friend'
      // }
    ],
    [pathname]
  );

  
  return (
    <>
      <div className="h-screen ">
        <div className="flex h-full">
          <div className=" sm:flex  hidden   flex-col gap-y-10 bg-indigo- h-full w-[100px] p-1">
            <div className="bg-gradient-to-b flex   flex-col rounded-lg h-full from-blue-100 to bg-indigo-200">
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
            
                    <div>
                      <FriendRequestSidebarItem/>
                    </div>
                  </div>
                </div>
              </Box>
              <div className="flex flex-col items-center justify-center py-5 space-y-12  ">
                <div className="w-12 h-12 rounded-full ">
                  {profileIcon ? (
                    <img
                      src={profileIcon}
                      alt="description"
                      className="rounded-full object-cover h-12 w-12"
                    />
                  ) : (
                    <UserIcon size={35} />
                  )}
                </div>
                <Button  onClick={handleSignOut} isLoading={isSigningOut} className="bg-indigo-500 border-2 shadow-md  transition-transform   bg-clip-padding  border-gray-100 backdrop-filter backdrop-blur-lg bg-opacity-40">
                  <LogOutIcon
                   
                    size={25}
                    className="cursor-pointer text-neutral-100"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
