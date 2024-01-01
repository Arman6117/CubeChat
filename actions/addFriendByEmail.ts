import axios, { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";

import { addFriendValidator } from "@/lib/validations/add-friend";

type FormData = z.infer<typeof addFriendValidator>;

export const addFriendByEmail = async (
  email: string,
  setError: UseFormSetError<FormData>
) => {
  try {
    const validatedEmail = addFriendValidator.parse({ email });

   await axios.post("/api/friends/add", {
      email: validatedEmail,
    },{
      withCredentials: true,
    });

     
     
    return true;
    
  } catch (error) {

    if (error instanceof z.ZodError) {
      setError("email", { message: error.message });
      console.log("error");
      
      return false;
    }

    if (error instanceof AxiosError) {
      setError("email", { message: error.response?.data });
      console.log("error");

      return false;
    }

    setError("email", { message: "Something went wrong" });
  }
};
