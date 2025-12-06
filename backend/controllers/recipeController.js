// backend/controllers/recipeController.js
import Recipe from "../models/Recipe.js";

export const getAllRecipes = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category && category !== "All") {
      query.category = category;
    }

    const recipes = await Recipe.find(query)
      .populate("createdBy", "name avatarColor")
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "name avatarColor"
    );
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      steps,
      imageUrl,
      tags,
      category,
      isVegetarian,
      difficulty,
      prepTime,
      cookTime,
    } = req.body;

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      steps,
      imageUrl,
      tags,
      category,
      isVegetarian,
      difficulty,
      prepTime,
      cookTime,
      createdBy: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await recipe.deleteOne();
    res.json({ message: "Recipe removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const userId = req.user._id;
    const index = recipe.likes.findIndex(
      (id) => id.toString() === userId.toString()
    );

    if (index === -1) {
      recipe.likes.push(userId);
    } else {
      recipe.likes.splice(index, 1);
    }

    await recipe.save();
    res.json({ likesCount: recipe.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
