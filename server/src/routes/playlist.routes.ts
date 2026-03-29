import { Router } from "express";
import { requireAuthMiddleware } from "../middlewares/auth.middleware.js";
import {
  deleteLink,
  generatePdf,
  getLinkFromDb,
  handleLink,
  sendVideos,
} from "../controllers/playList.controller.js";

const routes = Router();

routes.post(
  "/postLink",
  requireAuthMiddleware,
  handleLink
);

routes.get(
  "/getLink",
  requireAuthMiddleware,
  getLinkFromDb
);

routes.delete(
  "/:link",
  requireAuthMiddleware,
  deleteLink
);

routes.get(
  "/:playlistId/videos",
  requireAuthMiddleware,
  sendVideos
)


routes.get("/:videoId",
  generatePdf
)


routes.delete("/delete/:link",
  deleteLink
)
export default routes;
