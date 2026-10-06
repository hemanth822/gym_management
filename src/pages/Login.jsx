import { useState } from "react";

import api from "../services/api";

import { useNavigate }
  from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    let matchedUser = null;

    try {

      const response =
        await api.get("/users");

      const enteredEmail =
        email
          .trim()
          .toLowerCase();

      matchedUser =
        response.data.find(
          (existingUser) =>
            String(existingUser.email)
              .trim()
              .toLowerCase() ===
              enteredEmail &&
            String(existingUser.password) ===
              String(password)
        );

    } catch (error) {

      console.log(error);

      alert(
        "Server not reachable. Start json-server on port 3000."
      );

      return;

    }

    if (matchedUser) {

      localStorage.setItem(
        "user",
        JSON.stringify(
          matchedUser
        )
      );

      navigate("/");

      window.location.reload();

    } else {

      alert("Invalid Credentials");

    }

  }

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button className="submit-btn">
            Login
          </button>

        </form>

      </div>

    </div>

  );
}

export default Login;
