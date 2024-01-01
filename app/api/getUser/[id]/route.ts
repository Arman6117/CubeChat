import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import toast from "react-hot-toast";

export const GET = async (
  request: NextRequest,
  { params }: { params?: any }
) => {
  try {
    const userId = params.id;
    // console.log(userId);
    
    const userData = await db.get(`userData:${userId}`);

     
    if (!userData) {
      return toast.error("User not found");
    }

    return new Response(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
