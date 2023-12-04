"use client";
import Image from "next/image";
import React, { FormEvent, useRef, useState } from "react";
import { CameraIcon, PlusIcon } from "lucide-react";

// import { toast } from "react-hot-toast";
import { createNewUser } from "@/actions/createNewUser";

import Button from "./ui/Button";

type Props = {};

const CompleteProfilePageContent = (props: Props) => {
  const [userName, setUsername] = useState("");
  const [profileIcon, setProfileIcon] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const imageInput = useRef<HTMLInputElement | null>(null);

  const handleProfilePictureInputClick = () => {
    if (imageInput.current) {
      imageInput.current?.click();
    }
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const imageFile = e.target.files[0];
      setProfileIcon(imageFile);
      const url = URL.createObjectURL(imageFile);
      setImageUrl(url);
    }
  };

  const handleFormSubmit =async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {

      const data = {userName,profileIcon};
  
      await createNewUser(data);
    } catch (error) {
      console.log(error);
      
    }finally {
      setIsLoading(false)
    }
 
  };

  return (
    <div className="flex p-7 justify-between space-x-3 h-screen w-screen bg-neutral-50 ">
      <div className=" py-7 flex flex-col justify-start h-full w-full sm:w-[50%] bg-neutral-50">
        <div className="bg-red-0 w-full h-12">
          <div className="flex space-x- py-4 px-8">
            <h2 className=" bg-clip-text drop-shadow-md font-bold text-3xl bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent">
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
        <div className="w-full h-full space-y-8 flex flex-col py-4 px-8">
          <div className="mt-9">
            <h2 className="  text-2xl font-bold tracking-tight text-neutral-800">
              Lets Finish your profile
            </h2>
          </div>
          <div>
            <div className="flex flex-col">
              <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col py-3 space-y-3 ">
                  <label className="font-semibold text-neutral-800">
                    Username
                  </label>
                  <input
                    className="border-2 border-cyan-500 p-2 bg-neutral-50 outline-none rounded-md"
                    required
                    value={userName}
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col py-3 space-y-3 ">
                  <div
                    className="relative bg-white border-cyan-700 mt-8 border-4 border-dashed w-32 h-32 rounded-full"
                    onClick={handleProfilePictureInputClick}
                  >
                    {imageUrl ? null : (
                      <PlusIcon
                        size={40}
                        className="absolute  p-1 right-0 cursor-pointer bg-cyan-500 text-cyan-900 rounded-full "
                      />
                    )}

                    <div className="flex items-center justify-center">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          
                          fill
                          className="rounded-full object-cover"
                          // height={100}
                          alt="profile"

                        />
                      ) : (
                        <>
                          <input
                            type="file"
                            accept="image/jpeg, image/png"
                            ref={imageInput}
                            onChange={handleProfilePictureChange}
                            style={{ display: "none" }}
                          />
                          <CameraIcon
                            size={40}
                            className=" text-cyan-700 relative top-10 left-0"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  className="relative float-right"
                  isLoading={isLoading}
                  type="submit"
                  // onClick={handleFormSubmit}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className=" sm:flex hidden items-center justify-center  rounded-xl h-full w-3/5 bg-gradient-to-r from-cyan-500 to-blue-500 ">
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

export default CompleteProfilePageContent;
