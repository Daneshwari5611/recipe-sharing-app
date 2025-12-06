// backend/routes/recipeRoutes.js
import express from "express";
import {
  getAllRecipes,
  getMyRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  toggleLike,
} from "../controllers/recipeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllRecipes);
router.get("/my", protect, getMyRecipes);
router.get("/:id", getRecipeById);
router.post("/", protect, createRecipe);
router.put("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);
router.post("/:id/like", protect, toggleLike);

export default router;
