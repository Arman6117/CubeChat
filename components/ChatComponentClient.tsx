import { headers } from "next/headers";
import { Session, getServerSession } from "next-auth";
// import {  usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

import UserFriends from "./UserFriends";
import UserChats from "./UserChats";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

const ChatComponentClient = async () => {
  const headerLists = headers();
  const session = await getServerSession(authOptions);
  const pathname = headerLists.get("next-url") || "";

  // const [session, setSession] = useState<Session | null>(null);
  // const [unseenRequestCount, setUnseenRequestCount] = useState<number>(0);

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const session = await getSession();
  //     setSession(session);
  //   };
  //   fetchSession();
  // }, []);

  // useEffect(() => {
  //   const fetchUnseenRequests = async () => {
  //     try {
  //       if (session?.user?.id) {
  //         const newRequests = (await fetchRedis(
  //           "smembers",
  //           `user:${session.user.id}:incoming_friend_request`
  //         )) as User[];

  //         setUnseenRequestCount(newRequests.length);
  //       } else {
  //         console.error("User ID not available in session.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching unseen requests:", error);
  //     }
  //   };

  //   fetchUnseenRequests();
  // }, [session]);
  async function fetchUnseenRequests() {
    try {
      console.log(session);
      
      if (session) {
        const unseenRequest = (await fetchRedis(
          "smembers",
          `user:${session.user.id}:incoming_friend_request`
        )) as User[];
  
        console.log(unseenRequest);

        return unseenRequest.length;
      } else {
        return console.error("Unauthorized request");
      }
    } catch (error) {
      console.error("Error fetching unseen requests:", error);
    }
  }

  const unseenRequest = await fetchUnseenRequests();

  console.log(unseenRequest);

  return (
    <>
      <div className="flex flex-col p-2 space-y-8">
        <h1 className="text-sm leading-6 text-neutral-600 font-medium">
          {pathname === "/friends" ? "Friend requests" : "Your chats"}
        </h1>
        <nav className="flex flex-col flex-1">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            {/* <li>
              {pathname === "/friends" ? (
                <UserFriends initialUnseenRequestCount={unseenRequest} />
              ) : (
                <UserChats />
              )}
            </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ChatComponentClient;
