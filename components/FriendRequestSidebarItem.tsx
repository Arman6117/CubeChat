"use client";
import "dotenv/config";
import { fetchRedis } from "@/helpers/redis";

import { Users } from "lucide-react";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {};

const FriendRequestSidebarItem = (props: Props) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(0);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchUnseenRequests = async () => {
      try {
        if (session?.user?.id) {
          const newRequests = (await fetchRedis(
            "smembers",
            `user:${session.user.id}:incoming_friend_request`
          )) as User[];

          setUnseenRequestCount(newRequests.length);
        } else {
          console.error("User ID not available in session.");
        }
      } catch (error) {
        console.error("Error fetching unseen requests:", error);
      }
    };

    fetchUnseenRequests();
  }, [session]);

  return (
    <Link
      href={"friends"}
      className={twMerge(
        `h-auto w-full px-2 cursor-pointer py-2 transition-color flex rounded-md justify-center  text-neutral-800`
      )}
    >
      <div className="relative">
        <div className="absolute flex text-center justify-center items-center  w-4 h-4 rounded-full  bg-indigo-500 left-3 bottom-4">
          <span className="relative text-white font-semibold text-sm  ">{unseenRequestCount}</span>
        </div>
        <Users size={25} className="" />
        
      </div>
    </Link>
  );
};

export default FriendRequestSidebarItem;
