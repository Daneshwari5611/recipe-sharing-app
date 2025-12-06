// frontend/src/components/RecipeCard.jsx
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe, onLike }) => {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <div className="card recipe-card">
      {recipe.imageUrl ? (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="recipe-card-image"
        />
      ) : (
        <div className="recipe-card-image-placeholder">
          No image provided
        </div>
      )}

      <div className="recipe-card-body">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <h3 className="recipe-title">{recipe.title}</h3>
          <span className="badge">
            {recipe.difficulty || "Easy"}
          </span>
        </div>

        <p className="recipe-description">
          {recipe.description}
        </p>

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="tags">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="recipe-meta">
          <span>⏱ {totalTime} mins</span>
          <span>{recipe.isVegetarian ? "🌱 Veg" : "🍗 Non-veg"}</span>
        </div>
      </div>

      <div className="recipe-card-footer">
        <button type="button" onClick={onLike} className="like-button">
          ❤️ <span>{recipe.likes?.length || 0}</span>
        </button>

        <Link to={`/recipe/${recipe._id}`} className="button button-small">
          View
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
