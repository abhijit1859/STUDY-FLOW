import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function InitUser() {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    async function registerUser() {
      const token = await getToken();
      console.log(token)

      await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    registerUser();
  }, [isSignedIn]);

  return null;
}
