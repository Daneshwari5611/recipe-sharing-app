// frontend/src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login(form.email, form.password);
    if (res.success) navigate("/");
    else setError(res.message);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-6">
        <h2 className="text-xl font-semibold mb-1">Welcome back 👋</h2>
        <p className="text-sm text-slate-500 mb-4">
          Login to explore and share amazing recipes.
        </p>

        {error && (
          <div className="mb-3 text-sm text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-slate-500">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/5"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-xs text-slate-500">Password</label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/5"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full mt-2 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-slate-500 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-slate-900 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
