"use client";
import { useEffect, useState } from "react";
import axios from "../instance/instance";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (username === "" || password === "") {
      setError("Please fill in both fields");
      return;
    }

    const { data } = await axios.post("/user/login", { username, password });
    // console.log(data.id,`data login <<<<<<<<<<<<<,,,`);

    if (!data) {
      console.error(error);
      setError("Invalid username or password");
    } else {
      Swal.fire({
        title: "Login Success",
        text: "Login Success",
        icon: "success",
        confirmButtonText: "Ok",
      });
      localStorage.setItem("auth", JSON.stringify(data.id));
      //   router.push("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      router.push("/");
    }
  });

  return (
    <div>
      <div className="flex bg-gray-100  justify-center items-center h-screen">
        <div className="w-1/2 h-screen">
          <img
            src="https://images.unsplash.com/photo-1712785021787-72b6d6c837e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="m-10 p-8 w-full lg:w-1/2 ">
          <h1 className="flex text-2xl font-semibold mb-4 justify-center items-center">
            Login
          </h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <div className="mb-4 text-black">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-black rounded-md p-2"
              />
            </div>

            <div className="mb-4 text-black">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-black rounded-md p-2"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 font-semibold rounded-md p-3 w-40 justify-center items-center"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            don't have account ?
            <a href="/register" className="hover:underline text-blue-500">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
