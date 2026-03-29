import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
export async function registerUser(){
    const {getToken}= useAuth()
    const token = await getToken()

    const res = await axios.post("http://localhost:5000/register",
        {
            headers:{Authorization:`Bearer ${token}`}
        }
    )

    const data = await res.data();
    console.log(data)
}