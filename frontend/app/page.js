"use client";
import axios from "./instance/instance";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [dataUsers, setDataUsers] = useState();

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/users");
      console.log(data.users, `????`);
      setDataUsers(data.users);
    } catch (error) {
      console.log(error);
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
  }, []);
  return (
    <div className="flex flex-col gap-10 p-4">
      <div className="flex justify-between">
        <div>Home page</div>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 shadow-amber-50 shadow-2xl ">
          <thead className="text-L text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr>
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
                    <td className="px-6 py-4"> {el.firstName}</td>
                    <td className="px-6 py-4"> {el.username}</td>
                    <td className="px-6 py-4"> {el.password}</td>
                    <td className="px-6 py-4"> {el.age}</td>
                    <td className="flex px-6 py-4 gap-2 ">{"maaaaa"}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
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