import toast from "react-hot-toast";

interface createNewUserProps {
  userName: string;
  profileIcon: string | null;
  userId: string | undefined
}

export const createNewUser = async ({
  userName,
  profileIcon,
  userId
}: createNewUserProps) => {
  const data = { userName, profileIcon,userId };

  try {
    const response = await fetch("/api/finish-profile", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("User Created Successfully");
      return "Success"
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      toast.error(errorMessage);
      return "Error"
    }
  } catch (error) {
    console.log(error);
  }
};
