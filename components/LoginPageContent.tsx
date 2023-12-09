"use client";
import Image from "next/image";
import React, { useState } from "react";

import { signIn } from "next-auth/react";

import Button from "./ui/Button";
import { toast } from "react-hot-toast";

type Props = {};

const LoginPageContent = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // throw new Error("Test");
      await signIn("google");
      
    } catch (error) {
      toast.error("Something went wrong with your login");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex p-7  justify-between space-x-3 h-screen w-screen bg-neutral-50 ">
      <div className=" py-10 flex flex-col justify-start h-full w-full sm:w-[50%] bg-neutral-50">
        <div className="bg-red-0 w-full h-12">
          <div className="flex space-x- py-4 px-8">
            <h2 className=" bg-clip-text drop-shadow-md font-bold text-3xl bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent">
              CubeChat
            </h2>
            <div className="relative -top-6 drop-shadow-lg">
              <Image
                src={"/images/Logo.png"}
                alt="Logo"
                width={80}
                height={80}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full space-y-20 flex flex-col py-4 px-8">
          <div className="mt-14">
            <h2 className="  text-2xl font-bold tracking-tight text-neutral-800">
              Sign in to your account
            </h2>
          </div>
          <div>
            <Button
              isLoading={isLoading}
              type="button"
              className="max-w-sm mx-auto w-full"
              onClick={loginWithGoogle}
            >
              {isLoading ? null : (
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
              )}
              Google
            </Button>
          </div>
        </div>
      </div>

      <div className=" sm:flex hidden items-center justify-center  rounded-xl h-full w-3/5 bg-gradient-to-r from-indigo-500 to-blue-500 ">
        <div className="flex flex-col w-[70%] h-2/3 bg-neutral-400 bg-clip-padding border border-gray-100 backdrop-filter backdrop-blur-md bg-opacity-20 items-center rounded-xl shadow-md">
          <div className="">
            <Image
              src={"/images/Logo.png"}
              alt="Logo"
              width={150}
              height={150}
            />
          </div>
          <div className="flex flex-col text-center p-4 space-y-5">
            <h2 className="text-neutral-100 font-bold text-3xl tracking-wide drop-shadow-md">
              CubeChat
            </h2>
            <p className="text-neutral-50 font-light p-4">
              Have fun and chat with your friends effortlessly 😁
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageContent;
