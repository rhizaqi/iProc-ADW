"use client";
import { useState } from "react";
import axios from "../instance/instance";
import { redirect } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Example of form submission logic
    if (username === "" || password === "") {
      setError("Please fill in both fields");
      return;
    }

    try {
      const response = await axios({
        method: "POST",
        url: "/user/login",
        data: {
          username,
          password,
        },
      });
      console.log(response, `<<<<`);

      localStorage.setItem("auth", response.data);

      redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-white">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-black justify-center p-4"
      >
        <div>
          <label>Username:</label>
          <input
            className="p-1"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="p-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
