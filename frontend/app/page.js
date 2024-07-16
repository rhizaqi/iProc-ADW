"use client";
import { Dropdown } from "flowbite-react";
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
    order: "asc",
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

  const fetchData = async (params = {}) => {
    try {
      if (option.search) {
        const { data } = await axios.get(`/users/search?q=${option.search}`);
        setDataUsers(data.users);
      } else if (params.order && params.sortBy) {
        const { data } = await axios.get(
          `/users?sortBy=${params.sortBy}&order=${params.order}`
        );
        setDataUsers(data.users);
      } else {
        const { data } = await axios.get(`/users`);
        console.log(data.users, `????`);
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

  function handleSort(value) {
    setOption({
      ...option,
      sortBy: value,
    });
    fetchData({ ...option, sortBy: value });
  }
  function handleOrderBy(value) {
    setOption({
      ...option,
      order: value,
    });
    fetchData({ ...option, order: value });
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

      <div className="w-full text-sm text-center text-gray-800">
        <div className="flex text-L text-gray-900 uppercase bg-gray-500 h-20 items-center justify-between rounded-lg p-4">
          <div className="flex flex-col">
            <div className="text-2xl font-bold">{userLogin.firstName}</div>
            <div className="text-xs font-light">{userLogin.company?.title}</div>
            <div className="text-xs font-light">
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
            <Dropdown label="Sort" dismissOnClick={false} inline>
              <Dropdown.Item onClick={() => handleSort("firstName")}>
                First Name
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("lastName")}>
                Last Name
              </Dropdown.Item>
            </Dropdown>
          </div>
          <div>
            <Dropdown label="Order By" dismissOnClick={false} inline>
              <Dropdown.Item onClick={() => handleOrderBy("asc")}>
                Ascending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOrderBy("desc")}>
                Descending
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-300">
          <thead className="text-L text-gray-700 uppercase bg-gray-500">
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
                  <tr key={i} className="bg-gray-800">
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
