"use client";
import axios from "./instance/instance";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Home = () => {
  const router = useRouter();
  const [dataUsers, setDataUsers] = useState();
  const [userLogin, setUserLogin] = useState({});

  const dataLogin = async (idLogin) => {
    try {
      const { data } = await axios.get("/users/" + idLogin);
      setUserLogin(data);
      console.log(data, `yang login nih`);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/users");
      // console.log(data.users, `????`);
      setDataUsers(data.users);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.message,
        // text: "InternalServerError",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      redirect("login");
    }
    fetchData();
    const idLogin = localStorage.getItem("auth");
    dataLogin(idLogin);
  }, []);

  return (
    <div className="flex flex-col gap-10 p-4">
      <div className="flex justify-between">
        <div>Home page</div>
        <button
          className="w-20 h-10 border rounded-xl border-gray-800"
          onClick={() => router.push("/add")}
        >
          Add
        </button>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="w-full text-sm text-center text-gray-500 dark:text-gray-400 shadow-amber-50 shadow-2xl">
        <div className="flex text-L text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white h-20 items-center justify-between rounded-lg p-4">
          <div className="flex flex-col">
            <div className="text-2xl font-bold">{userLogin.firstName}</div>
            <div className="text-xs font-thin">{userLogin.company?.title}</div>
            <div className="text-xs font-thin">
              {userLogin.company?.department}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <input
              className="rounded-xl p-2 text-light"
              placeholder="search"
              type="text"
              // onChange={(event) => handleSearch(event.target.value)}
            />
            <h2> Search </h2>
          </div>
          <div>
            <button> Name </button>
            {/* drop down firstName, lastName */}
          </div>
          <div>
            <button> Date </button>
            {/* ASC - DESC */}
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 shadow-amber-50 shadow-2xl">
          <thead className="text-L text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Usia
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {dataUsers ? (
              dataUsers.map((el, i) => {
                return (
                  <tr
                    key={i}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4"> {i + 1}</td>
                    <td className="px-6 py-4"> {el.firstName}</td>
                    <td className="px-6 py-4"> {el.username}</td>
                    <td className="px-6 py-4"> {el.password}</td>
                    <td className="px-6 py-4"> {el.age}</td>
                    <td className="flex px-6 py-4 gap-2 justify-center">
                      {" "}
                      <button
                        className="border border-white w-12 h-8 rounded-xl"
                        onClick={() => router.push(`users/` + el.id)}
                      >
                        See
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="h-16">
                <td colSpan={10}>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Home;
