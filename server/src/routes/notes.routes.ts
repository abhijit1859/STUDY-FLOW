import { Router } from "express";
import { createNotes, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notes.controller.js";
import { requireAuthMiddleware } from "../middlewares/auth.middleware.js";

const router=Router()

router.post("/",requireAuthMiddleware,createNotes)
router.get("/",requireAuthMiddleware,getAllNotes)


router.get("/:id",getNoteById)
router.put("/:id",updateNote)
router.delete("/:id",deleteNote)

export default router