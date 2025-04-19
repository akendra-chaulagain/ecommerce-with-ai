import { Router } from "express";
import { searchFromDatabase } from "../controllers/search.controllers.js";
const router = Router();

// search whole database
router.route("/").get(searchFromDatabase);

export default router;
