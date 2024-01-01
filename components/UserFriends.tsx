"use client";

import { fetchRedis } from "@/helpers/redis";
import { FC, useEffect, useState } from "react";

interface UserFriendsProps {
  sessionId: string;
  //   initialUnseenRequestCount: number;
}

const UserFriends: FC<UserFriendsProps> = ({ sessionId }) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(0);

 
  console.log(sessionId);
  
  return (
    <div>{unseenRequestCount > 0 ? <div>Done</div> : <div>not done</div>}</div>
  );
};

export default UserFriends;
