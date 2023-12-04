import { db } from "@/lib/db";
// import { NextApiRequest, NextApiResponse } from "next";

import { NextRequest } from "next/server";


export const POST = async (request: NextRequest) => {
  const { userName, profileIcon } = await request.json();

  try {
    const existingUser = await db.get(`user:${userName}`);
  
    // console.log(existingUser);
    
    if (existingUser) {
      return new Response(JSON.stringify("Username already in use"), {
        status: 400,
      });
      
    }

    await db.set(`user:${userName}`, JSON.stringify({userName, profileIcon}));
    return new Response(JSON.stringify("User created successfully"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify("Something went wrong"), {
      status: 500,
    });
  }
};
