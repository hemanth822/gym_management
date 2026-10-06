import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addFavorite } from "../features/favoritesSlice";

function MemberCard({
  member,
  onDelete,
}) {
  const dispatch = useDispatch();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const isAdmin =
    user?.role === "admin";

  function handleFavorite() {
    dispatch(addFavorite(member));
  }

  return (
    <div className="card">
      <img
        src={member.image}
        alt={member.name}
      />

      <h3>{member.name}</h3>

      <p>📍 {member.location}</p>

      <p>🏋️ {member.type}</p>

      <p>🎂 {member.age} Years</p>

      <p>₹ {member.fees}</p>

      <div className="card-actions">
        <Link
          className="view-btn"
          to={`/members/${member.id}`}
        >
          View
        </Link>

        {isAdmin && (
          <>
            <Link
              className="edit-btn"
              to={`/edit-member/${member.id}`}
            >
              Edit
            </Link>

            <button
              className="delete-btn"
              onClick={() => onDelete(member.id)}
            >
              Delete
            </button>
          </>
        )}

        <button
          className="favorite-btn"
          onClick={handleFavorite}
        >
          ❤️ Add To Favorites
        </button>
      </div>
    </div>
  );
}

export default MemberCard;