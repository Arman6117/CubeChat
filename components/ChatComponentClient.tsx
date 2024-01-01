
import { Session } from "next-auth";
import {  usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

import UserFriends from "./UserFriends";
import UserChats from "./UserChats";


const ChatComponentClient = () => {
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
 
 
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  return session ? (
    <>
      <div className="flex flex-col p-2 space-y-8">
        <h1 className="text-sm leading-6 text-neutral-600 font-medium">
          {pathname === "/friends" ? "Friend requests" : "Your chats"}
        </h1>
        <nav className="flex flex-col flex-1">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>{pathname === "/friends" ? <UserFriends sessionId={session.user.id} /> : <UserChats />}</li>
          </ul>
        </nav>
      </div>
    </>
  ) : (
    <>
      <h1>Loading your session</h1>
    </>
  );
};

export default ChatComponentClient;
