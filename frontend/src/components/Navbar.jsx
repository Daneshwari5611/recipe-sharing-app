// frontend/src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="logo-icon">👨‍🍳</span>
          <span className="brand-text">FoodieLand</span>
        </Link>

        {user ? (
          <div className="navbar-actions">
            <Link to="/my-recipes" className="navbar-link">
              My Recipes
            </Link>

            <Link to="/add" className="button button-small">
              + New Recipe
            </Link>

            <div className="avatar-wrapper">
              <div
                className="avatar-circle"
                style={{ backgroundColor: user.avatarColor || "#fb5607" }}
              >
                {user.name?.[0]?.toUpperCase()}
              </div>

              <span className="navbar-link">{user.name}</span>

              <button
                onClick={handleLogout}
                className="button-outline button-small"
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="navbar-actions">
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="button button-small">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
