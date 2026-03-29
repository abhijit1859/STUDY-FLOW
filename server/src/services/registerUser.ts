import type { RequestHandler } from "express";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/backend";
import { User } from "../models/user.model.js";

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const payload = req.body;

    const headers = {
      "svix-id": String(req.headers["svix-id"]),
      "svix-timestamp": String(req.headers["svix-timestamp"]),
      "svix-signature": String(req.headers["svix-signature"]),
    };

    const wh = new Webhook(process.env.WEBHOOK_SECRET as string);
    const event = wh.verify(payload, headers) as WebhookEvent;

    console.log("Event type:", event.type);
 
    if (event.type === "user.created") {
      const user = event.data;
 
      const exists = await User.findOne({ userId: user.id });
      if (exists) {
        console.log("ℹ️ User already exists:", user.id);
        return res.status(200).json({ success: true });
      }

      await User.create({
        userId: user.id,
        email: user.email_addresses[0]!.email_address,
        name: user.first_name ?? "",
      });

      console.log("✅ User created in DB:", user.id);
    }

   
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Webhook handler error:", err);
    res.status(200).json({ success: true });    
  }
};
