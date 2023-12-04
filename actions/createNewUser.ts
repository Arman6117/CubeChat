import toast from "react-hot-toast";

interface createNewUserProps {
  userName: string;
  profileIcon: File | null;
}

export const createNewUser = async ({
  userName,
  profileIcon,
}: createNewUserProps) => {
  const data = { userName, profileIcon };

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
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      toast.error(errorMessage);
    }
  } catch (error) {
    toast.error(error);
  }
};
