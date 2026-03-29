import { createClerkClient } from "@clerk/backend";
import dotenv from 'dotenv'
dotenv.config()

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY as string,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY as string,
})