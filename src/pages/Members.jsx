import { useEffect, useState } from "react";

import api from "../services/api";

import MemberCard from "../components/MemberCard";

import { Link } from "react-router-dom";

function Members() {
  const [members, setMembers] = useState([]);

  // Search and filter states
  const [search, setSearch] = useState("");

  const [type, setType] = useState("All");

  const [duration, setDuration] = useState("All");

  const [fees, setFees] = useState("All");

  const [sort, setSort] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isAdmin = user?.role === "admin";

  // Fetch members
  useEffect(() => {
    getMembers();
  }, []);

  async function getMembers() {
    try {
      const response = await api.get("/members");

      setMembers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Delete member
  async function deleteMember(id) {
    try {
      await api.delete(`/members/${id}`);

      setMembers((prevMembers) =>
        prevMembers.filter(
          (member) => member.id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Search and combined filters
  const filteredMembers = members.filter(
    (member) => {
      const searchMatch = member.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const typeMatch =
        type === "All" ||
        member.type === type;

      const durationMatch =
        duration === "All" ||
        member.duration === duration;

      const feesMatch =
        fees === "All" ||
        (fees === "under5000" &&
          member.fees < 5000) ||
        (fees === "5000to10000" &&
          member.fees >= 5000 &&
          member.fees <= 10000) ||
        (fees === "above10000" &&
          member.fees > 10000);

      return (
        searchMatch &&
        typeMatch &&
        durationMatch &&
        feesMatch
      );
    }
  );

  // Sorting
  let finalMembers = [
    ...filteredMembers,
  ];

  if (sort === "high") {
    finalMembers.sort(
      (a, b) => b.fees - a.fees
    );
  }

  if (sort === "low") {
    finalMembers.sort(
      (a, b) => a.fees - b.fees
    );
  }

  return (
    <>
      <h1>Gym Members</h1>

      {/* Search and Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search Member"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <option>All</option>
          <option>Basic</option>
          <option>Standard</option>
          <option>Premium</option>
          <option>Elite</option>
        </select>

        <select
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
        >
          <option>All</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>

        <select
          value={fees}
          onChange={(e) =>
            setFees(e.target.value)
          }
        >
          <option>All</option>

          <option value="under5000">
            Under ₹5,000
          </option>

          <option value="5000to10000">
            ₹5,000 - ₹10,000
          </option>

          <option value="above10000">
            Above ₹10,000
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="">
            Sort Fees
          </option>

          <option value="high">
            High To Low
          </option>

          <option value="low">
            Low To High
          </option>
        </select>
      </div>

      {/* Add Member Button */}
      {isAdmin && (
        <Link
          className="add-btn"
          to="/add-member"
        >
          Add Member
        </Link>
      )}

      {/* Member Cards */}
      <div className="members">
        {finalMembers.length === 0 ? (
          <p>No members found.</p>
        ) : (
          finalMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onDelete={deleteMember}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Members;
