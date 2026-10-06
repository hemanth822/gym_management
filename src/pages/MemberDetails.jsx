import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import api from "../services/api";

function MemberDetails() {

  const { id } = useParams();

  const [member, setMember] =
    useState(null);

  useEffect(() => {
    getMember();
  }, []);

  async function getMember() {

    try {

      const response =
        await api.get(
          `/members/${id}`
        );

      setMember(response.data);

    } catch (error) {

      console.log(error);

    }

  }

  if (!member) {
    return <h2>Loading...</h2>;
  }

  return (

    <div className="details">

      <img
        src={member.image}
        alt={member.name}
      />

      <h1>{member.name}</h1>

      <p>
        {member.description}
      </p>

      <h3>Location</h3>
      <p>{member.location}</p>

      <h3>City</h3>
      <p>{member.city}</p>

      <h3>Membership Type</h3>
      <p>{member.type}</p>

      <h3>Duration</h3>
      <p>{member.duration}</p>

      <h3>Fees</h3>
      <p>₹ {member.fees}</p>

      <h3>Age</h3>
      <p>{member.age}</p>

      <h3>Workout Days</h3>
      <p>{member.workoutDays}</p>

      <h3>Weight</h3>
      <p>{member.weight} kg</p>

      <h3>Trainer</h3>
      <p>{member.trainer}</p>

    </div>

  );
}

export default MemberDetails;
