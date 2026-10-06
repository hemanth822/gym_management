import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import api from "../services/api";

function EditMember() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      location: "",
      city: "",
      type: "",
      duration: "",
      fees: "",
      age: "",
      workoutDays: "",
      weight: "",
      image: "",
      description: "",
      trainer: ""
    });

  useEffect(() => {
    getMember();
  }, []);

  async function getMember() {

    const response =
      await api.get(
        `/members/${id}`
      );

    setFormData(response.data);
  }

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    await api.put(
      `/members/${id}`,
      formData
    );

    navigate("/members");
  }

  return (

    <div className="form-container">

      <h2>Edit Member</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
        />

        <input
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />

        <input
          name="fees"
          value={formData.fees}
          onChange={handleChange}
        />

        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
        />

        <input
          name="workoutDays"
          value={formData.workoutDays}
          onChange={handleChange}
        />

        <input
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          name="trainer"
          value={formData.trainer}
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <button className="submit-btn">
          Update Member
        </button>

      </form>

    </div>

  );
}

export default EditMember;