import express from "express";
import {
  getNoteById,
  getNotes,
  CreateNote,
  DeleteNote,
  UpdateNote,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect,getNotes);
router.route("/create").post(protect,CreateNote);
router.route("/:id").get(getNoteById)
  .delete(protect, DeleteNote)
  .put(protect, UpdateNote);

export default router;
