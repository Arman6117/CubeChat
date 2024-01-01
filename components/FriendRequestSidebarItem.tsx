"use client";
import  'dotenv/config'
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

  const upstashRedisURL = process.env.UPSTASH_REDIS_REST_URL;

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
        console.log("Session:", session);
        if (session?.user?.id) {
       
          const newRequests = (await fetchRedis(
            "smembers",
            `user:${session.user.id}:incoming_friend_request`
          )) as User[];

          console.log(newRequests);

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
      <Users size={25} className="" />
      {unseenRequestCount > 0 ? "Done" : "Not done"}
    </Link>
  );
};

export default FriendRequestSidebarItem;
