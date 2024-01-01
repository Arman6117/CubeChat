import { getServerSession } from "next-auth";
import { z } from "zod";

import { addFriendValidator } from "@/lib/validations/add-friend";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchRedis } from "@/helpers/redis";
import { getSession } from "next-auth/react";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body.email);
    console.log(emailToAdd);
    

    const isToAdd = (await fetchRedis(
      "get",
      `user:email:${emailToAdd}`
    )) as string;

    // console.log(isToAdd);
    
    if (!isToAdd) {
      return new Response("This person does not exist", { status: 400 });
    }

    const session = await getServerSession(authOptions);

        console.log(session);
        

    
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (isToAdd === session.user.id) {
      return new Response("You cannot add yourself as a friend", {
        status: 400,
      });
    }

    //! Check if the user is already added

    const isAlreadyAdded = (await fetchRedis(
      "sismember",
      `user:${isToAdd}:incoming_friend_request`,
      session.user.id
    )) as 0 | 1;

    if (isAlreadyAdded) {
      return new Response("You already added this user", { status: 400 });
    }

    //! Check if the yser is already friend

    const isAlreadyFriends = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      isToAdd
    )) as 0 | 1;

    if (isAlreadyFriends) {
      return new Response("You already friend with this user", { status: 400 });
    }

    //! Valid request, send friend request

    await db.sadd(`user:${isToAdd}:incoming_friend_request`, session.user.id);

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }


    
    return new Response("Invalid request", { status: 400 });
  }
}
