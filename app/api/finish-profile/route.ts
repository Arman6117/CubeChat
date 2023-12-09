import { db } from "@/lib/db";
// import { NextApiRequest, NextApiResponse } from "next";

import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { userName, profileIcon, userId } = await request.json();

  try {
    //!Check if username is already in use
    const existingUser = await db.get(`userName:${userName}`);
   
    if (existingUser) {
      return new Response(JSON.stringify("Username already in use"), {
        status: 400,
      });
    }

    await db.set(
      `userName:${userName}`,userId
    );
    
    await db.set(
      `userData:${userId}`,
      JSON.stringify({ userName, profileIcon, userId })
    );

    return new Response(JSON.stringify("User created successfully"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify("Something went wrong"), {
      status: 500,
    });
  }
};
