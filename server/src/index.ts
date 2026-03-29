import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import { connectDb } from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import playListRoutes from "./routes/playlist.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import testRoutes from "./routes/note.routes.js";
import { errorMiddleware } from "./middlewares/errorMidddleware.js";

dotenv.config();

const app = express();

 
app.use(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  userRoutes
);
 
app.use(express.json());

 
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

 
//app.use(clerkMiddleware());

 
connectDb();
 
app.use("/api/v1/list", playListRoutes);
app.use("/api/v1/notes", notesRoutes);
 

 
app.use(errorMiddleware);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


// import express from "express";
// import testRoutes from "./routes/note.routes.js";
// import { connectDb } from "./utils/db.js";
// import userRoutes from "./routes/user.routes.js";
// import playListRoutes from "./routes/playlist.routes.js";
 
// import dotenv from "dotenv";
// import { errorMiddleware } from "./middlewares/errorMidddleware.js";

// dotenv.config();

// const app = express();

// app.use(express.json());

// app.use("/api/v1", playListRoutes);
 
// app.use("/api/v1/test", testRoutes);

// connectDb();

// app.use(errorMiddleware); 

// app.listen(5000, () => {
//   console.log("✅ Server running on port 5000");
// });
