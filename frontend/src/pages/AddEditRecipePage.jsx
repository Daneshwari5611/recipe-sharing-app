// frontend/src/pages/AddEditRecipePage.jsx
import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

const AddEditRecipePage = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredientsText: "",
    stepsText: "",
    imageUrl: "",
    tagsText: "",
    categories: [], // Multiple categories now
    isVegetarian: true,
    difficulty: "Easy",
    prepTime: 10,
    cookTime: 20,
  });

  const [loading, setLoading] = useState(false);

  const fetchRecipe = async () => {
    if (!isEdit || !id) return;
    try {
      const res = await api.get(`/recipes/${id}`);
      const r = res.data;
      setForm({
        title: r.title,
        description: r.description,
        ingredientsText: r.ingredients.join("\n"),
        stepsText: r.steps.join("\n"),
        imageUrl: r.imageUrl || "",
        tagsText: r.tags?.join(", "),
        categories: r.categories || [],
        isVegetarian: r.isVegetarian,
        difficulty: r.difficulty,
        prepTime: r.prepTime,
        cookTime: r.cookTime,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCategoryCheckbox = (e) => {
    const { value, checked } = e.target;
    let updatedCats = [...form.categories];

    if (checked) {
      updatedCats.push(value);
    } else {
      updatedCats = updatedCats.filter((c) => c !== value);
    }

    setForm({ ...form, categories: updatedCats });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: form.title,
      description: form.description,
      ingredients: form.ingredientsText.split("\n").filter(Boolean),
      steps: form.stepsText.split("\n").filter(Boolean),
      imageUrl: form.imageUrl,
      tags: form.tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      categories: form.categories, // updated
      isVegetarian: form.isVegetarian,
      difficulty: form.difficulty,
      prepTime: Number(form.prepTime),
      cookTime: Number(form.cookTime),
    };

    try {
      if (isEdit) {
        await api.put(`/recipes/${id}`, payload);
      } else {
        await api.post("/recipes", payload);
      }
      navigate("/my-recipes");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2 className="form-title">
          {isEdit ? "Edit recipe" : "Add a new recipe"}
        </h2>
        <p className="form-subtitle">
          Add ingredients and steps line by line for a clean layout.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div>
              <label className="field-label">Title</label>
              <input
                name="title"
                className="input"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="field-label">Image URL</label>
              <input
                name="imageUrl"
                className="input"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label className="field-label">Short description</label>
            <textarea
              name="description"
              rows={3}
              className="textarea"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-grid-2">
            <div>
              <label className="field-label">Ingredients (one per line)</label>
              <textarea
                name="ingredientsText"
                rows={6}
                className="textarea"
                value={form.ingredientsText}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="field-label">Steps (one per line)</label>
              <textarea
                name="stepsText"
                rows={6}
                className="textarea"
                value={form.stepsText}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-grid-4">
            <div>
              <label className="field-label">Categories</label>
              <div className="checkbox-group">
                {[
                  "Breakfast",
                  "Lunch",
                  "Dinner",
                  "Dessert",
                  "Snack",
                  "Beverages",
                ].map((cat) => (
                  <label key={cat} className="checkbox-row">
                    <input
                      type="checkbox"
                      value={cat}
                      checked={form.categories.includes(cat)}
                      onChange={handleCategoryCheckbox}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="field-label">Difficulty</label>
              <select
                name="difficulty"
                className="select"
                value={form.difficulty}
                onChange={handleChange}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div>
              <label className="field-label">Prep time (mins)</label>
              <input
                type="number"
                name="prepTime"
                className="input"
                value={form.prepTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="field-label">Cook time (mins)</label>
              <input
                type="number"
                name="cookTime"
                className="input"
                value={form.cookTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-grid-2" style={{ marginTop: 8 }}>
            <div>
              <label className="field-label">Tags (comma separated)</label>
              <input
                name="tagsText"
                className="input"
                placeholder="quick, spicy, dinner"
                value={form.tagsText}
                onChange={handleChange}
              />
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                name="isVegetarian"
                checked={form.isVegetarian}
                onChange={handleChange}
              />
              Vegetarian
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="button"
            style={{ marginTop: 16 }}
          >
            {loading ? "Saving..." : isEdit ? "Save changes" : "Create recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditRecipePage;
