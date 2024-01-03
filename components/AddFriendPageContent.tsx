"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { addFriendValidator } from "@/lib/validations/add-friend";

import { ArrowRight } from "lucide-react";

import Button from "./ui/Button";
import { z } from "zod";
import { addFriendByEmail } from "@/actions/addFriendByEmail";

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendPageContent = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    const success = await addFriendByEmail(data.email, setError);
 
    if (success) {
      setSuccess(true);
    }
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col  space-y-12 w-[100%] h-[30rem] p-0 sm:p-4 md:p-10  items-center">
      <div>
        <h2 className="md:text-5xl  text-3xl font-bold">Add a new friend</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:w-[60%] w-full space-y-9 text-start "
      >
        <div className="flex flex-col sm:flex-row sm:space-x-9 space-y-8 sm:space-y-0">
          <label
            htmlFor="email"
            className="text block font-semibold leading-6 text-neutral-700"
          >
            Add friend by E-mail
          </label>
          <div className="flex space-x-3">
            <input
              {...register("email")}
              className=" block w-full rounded-md px-4 border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              placeholder="your@example.com"
            />
            <Button size={"sm"} isLoading={isLoading}>
              <ArrowRight />
            </Button>
          </div>
        </div>
        <p className="text-sm mt-1 text-red-600">{errors.email?.message}</p>
        {success ? (
          <p className="text-sm mt-1 text-green-600">Friend request sent!!</p>
        ) : null}
      </form>
      {/* <form className="flex flex-col md:w-[50%] w-full space-y-9 text-start ">
        <h1 className="text-center text-5xl font-semibold">OR</h1>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-8 sm:space-y-0">
          <label
            htmlFor="text"
            className="text block font-semibold leading-6 text-neutral-700"
          >
            Add friend by username
          </label>
          <div className="flex space-x-3">
            <input
              className=" block w-full rounded-md px-4 border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              placeholder="testUser"
            />
            <Button size={"sm"}>
              <ArrowRight />
            </Button>
          </div>
        </div>
      </form> */}
    </div>
  );
};

export default AddFriendPageContent;
