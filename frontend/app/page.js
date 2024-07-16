"use client";
import axios from "./instance/instance";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Home = () => {
  const router = useRouter();
  const [dataUsers, setDataUsers] = useState();
  const [userLogin, setUserLogin] = useState({});
  const [option, setOption] = useState({
    sortBy: "",
    order: "",
    search: "",
  });

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
      if (option.search) {
        const { data } = await axios.get(`/users/search?q=${option.search}`);
        setDataUsers(data.users);
      } else if (option.order && option.sortBy) {
        const { data } = await axios.get(
          `/users?sortBy=${option.sortBy}&order=${option.order}`
        );
        setDataUsers(data.users);
      } else {
        const { data } = await axios.get(`/users`);
        // console.log(data.users, `????`);
        setDataUsers(data.users);
      }
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

  function handleSearch(value) {
    setOption({
      ...option,
      search: value,
    });
  }

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

  console.log(option, `<< option bisa kah?`);
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
          <div className="flex items-center">
            <div className="flex justify-around gap-5">
              <input
                className="rounded-xl p-2 text-black"
                placeholder="search"
                type="text"
                value={option.search}
                onChange={(event) => handleSearch(event.target.value)}
              />
              <button onClick={fetchData}>Search</button>
            </div>
          </div>
          <div>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Sort {" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button> Order by </button>
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
