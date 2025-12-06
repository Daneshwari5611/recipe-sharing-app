// frontend/src/pages/MyRecipesPage.jsx
import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { Link } from "react-router-dom";

const MyRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchMyRecipes = async () => {
    try {
      const res = await api.get("/recipes/my");
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this recipe?")) return;
    try {
      await api.delete(`/recipes/${id}`);
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="section-header">
        <h2 className="section-title">My recipes</h2>
        <Link to="/add" className="button button-small">
          + New recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <p className="text-muted">
          You haven't added any recipes yet.
        </p>
      ) : (
        <div className="my-recipes-grid">
          {recipes.map((r) => (
            <div key={r._id} className="card">
              <h3 className="my-recipe-card-title">{r.title}</h3>
              <p className="my-recipe-description">
                {r.description}
              </p>

              <div className="my-recipe-footer">
                <div style={{ display: "flex", gap: 8 }}>
                  <Link to={`/edit/${r._id}`} className="button button-small">
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(r._id)}
                    className="button-danger button-small"
                  >
                    Delete
                  </button>
                </div>
                <Link to={`/recipe/${r._id}`} className="link-subtle">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipesPage;
