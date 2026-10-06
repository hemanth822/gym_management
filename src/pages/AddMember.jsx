import { useState } from "react";

import api from "../services/api";

import { useNavigate }
  from "react-router-dom";

function AddMember() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      location: "",
      city: "",
      type: "",
      duration: "Monthly",
      fees: "",
      age: "",
      workoutDays: "",
      weight: "",
      image: "",
      description: "",
      trainer: ""
    });

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    await api.post(
      "/members",
      formData
    );

    navigate("/members");
  }

  return (

    <div className="form-container">

      <h2>Add Member</h2>

      <form
        onSubmit={handleSubmit}
      >

        <input
          name="name"
          placeholder="Member Name"
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
        />

        <input
          name="type"
          placeholder="Membership Type"
          onChange={handleChange}
        />

        <select
          name="duration"
          onChange={handleChange}
        >
          <option value="Monthly">
            Monthly
          </option>

          <option value="Yearly">
            Yearly
          </option>
        </select>

        <input
          type="number"
          name="fees"
          placeholder="Fees"
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
        />

        <input
          type="number"
          name="workoutDays"
          placeholder="Workout Days"
          onChange={handleChange}
        />

        <input
          type="number"
          name="weight"
          placeholder="Weight in kg"
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />

        <input
          name="trainer"
          placeholder="Assigned Trainer"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <button className="submit-btn">
          Add Member
        </button>

      </form>

    </div>

  );
}

export default AddMember;
