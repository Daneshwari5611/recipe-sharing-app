// frontend/src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import RecipeCard from "../components/RecipeCard";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/recipes", {
        params: { search, category },
      });
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleFilter = () => {
    fetchRecipes();
  };

  const handleLike = async (id) => {
    if (!user) return;
    try {
      const res = await api.post(`/recipes/${id}/like`);
      setRecipes((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, likes: Array(res.data.likesCount).fill(0) } : r
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];

  return (
    <div className="page">
      {/* Hero section */}
      <section className="hero">
        <h1 className="hero-title">Share your favourite recipes</h1>
        <p className="hero-text">
          Discover simple, delicious meals from home cooks like you. Save
          recipes, explore new ideas, and build your own collection.
        </p>
      </section>

      {/* Filters */}
      <section className="filter-bar">
        <div className="filter-input">
          <input
            type="text"
            placeholder="Search recipes by title…"
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button type="button" onClick={handleFilter} className="button button-small">
          Apply
        </button>
      </section>

      {/* Recipe list */}
      {loading ? (
        <p className="text-muted text-center mt-8">Loading recipes…</p>
      ) : recipes.length === 0 ? (
        <p className="text-muted text-center mt-8">
          No recipes found. Try changing filters.
        </p>
      ) : (
        <section className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onLike={() => handleLike(recipe._id)}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default HomePage;
