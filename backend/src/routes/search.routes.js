import { Router } from "express";
import {
  searchFromDatabase,
  searchProduct,
} from "../controllers/search.controllers.js";
const router = Router();

// search whole database
router.route("/").get(searchFromDatabase);
router.route("/search-product").get(searchProduct);

export default router;
