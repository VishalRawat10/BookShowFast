import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AppBtn from "../ui/AppBtn";
import useProfile from "../../hooks/useProfile";

export default function Navbar() {
  const { user, isAuthenticated, logout, getProfile } = useAuth();
  useProfile();

  return (
    <nav className="flex items-center justify-between h-18 bg-white px-12 shadow-md">
      <div>
        <NavLink to="/">
          <img src="/images/logo.png" alt="logo" className="h-24" />
        </NavLink>
      </div>

      <div className="flex gap-8 items-center">
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "nav-link")}
          to=""
        >
          Explore
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "nav-link")}
          to="/movies"
        >
          Movies
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "nav-link")}
          to="/sports"
        >
          Sports
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "nav-link")}
          to="/live"
        >
          Live
        </NavLink>
        <div className="flex gap-4">
          {isAuthenticated ? (
            <>
              <AppBtn onClick={logout}>Log out</AppBtn>
              <Link to="/profile">Profile</Link>
            </>
          ) : (
            <>
              <Link className="nav-button" to="/login">
                Login
              </Link>
              <Link className="nav-button" to="/login">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
