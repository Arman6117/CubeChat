'use  server'
import { fetchRedis } from "@/helpers/redis";
import { Session, getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";
import FriendRequests from "./FriendRequests";
import { authOptions } from "@/lib/auth";

interface UserFriendsProps {
  // session: Session;
  initialUnseenRequestCount: number;
}

//! Define a type for the incoming friend request data

const UserFriends: FC<UserFriendsProps> = async ({
  // session,
  initialUnseenRequestCount,
}) => {
  const session = await getServerSession(authOptions)
  if (!session) notFound();

  //! Fetching the incoming friend request
  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_request`
  )) as string[];

  const incomingFriendRequest = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = JSON.parse(
        await fetchRedis("get", `userData:${senderId}`)
      ) as UserData;

      return {
        senderId,
        senderUserName: sender.userName,
        senderImage: sender.profileIcon,
      };
    })
  );

  return (
    <main>
      <FriendRequests
        incomingFriendRequests={incomingFriendRequest}
        sessionId={session.user.id}
      />
    </main>
  );
};

export default UserFriends;
