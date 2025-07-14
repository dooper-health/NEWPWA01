
import express from "express";
import {
  createUrgentCase,
  upload,

} from "../controllers/UrgentCaseController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Define a route that handles both file upload and urgent case creation
router.post("/urgent",upload.single("file"), createUrgentCase);

export default router;
