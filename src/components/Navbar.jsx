import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );
  const favorites = useSelector(
    (state) => state.favorites
    );

  return (

    <nav>

      <Link to="/">
        Home
      </Link>

      <Link to="/members">
        Members
      </Link>

      {!user && (
        <>
          <Link to="/register">
            Signup
          </Link>

          <Link to="/login">
            Login
          </Link>
        </>
      )}

      {user && (
        <>
          <Link to="/logout">
            Logout
          </Link>
        </>
      )}
    <Link to="/favorites">
      Favorites ({favorites.length})
    </Link>
    </nav>

  );
}

export default Navbar;