// frontend/src/pages/RecipeDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosClient";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = async () => {
    try {
      const res = await api.get(`/recipes/${id}`);
      setRecipe(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="text-sm text-slate-500">Loading...</p>;

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-xl mb-2"
        />
      )}

      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {recipe.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            by {recipe.createdBy?.name || "Unknown"}
          </p>
        </div>
        <div className="flex flex-col items-end text-xs text-slate-500">
          <span>
            {recipe.isVegetarian ? "🌱 Vegetarian" : "🍗 Non-vegetarian"}
          </span>
          <span>{recipe.difficulty} • {totalTime} mins</span>
        </div>
      </div>

      <p className="text-sm text-slate-700">{recipe.description}</p>

      <div className="flex flex-wrap gap-2">
        {recipe.tags?.map((tag) => (
          <span
            key={tag}
            className="text-[11px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2 text-slate-900 text-sm">
            Ingredients
          </h3>
          <ul className="space-y-1 text-sm text-slate-700">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-slate-900 text-sm">
            Steps
          </h3>
          <ol className="space-y-2 text-sm text-slate-700">
            {recipe.steps.map((step, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-0.5 text-xs font-semibold text-slate-500">
                  {idx + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
