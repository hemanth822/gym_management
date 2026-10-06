import { useDispatch, useSelector } from "react-redux";

import { removeFavorite } from "../features/favoritesSlice";

function Favorites() {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.favorites
  );

  return (
    <div>
      <h1>My Favorites</h1>

      {favorites.length === 0 ? (
        <div>
          <h2>No Members In Favorites</h2>

          <p>
            Add members from the Members page.
          </p>
        </div>
      ) : (
        <div className="members">
          {favorites.map((member) => (
            <div
              className="card"
              key={member.id}
            >
              <img
                src={member.image}
                alt={member.name}
              />

              <h3>{member.name}</h3>

              <p>📍 {member.location}</p>

              <p>₹ {member.fees}</p>

              <button
                className="delete-btn"
                onClick={() =>
                  dispatch(
                    removeFavorite(member.id)
                  )
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;