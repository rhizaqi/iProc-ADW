"use client";

import { useRouter } from "next/navigation";
import axios from "../instance/instance";
import { useState } from "react";

const Add = () => {
  const router = useRouter();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });

  const dataHandler = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitAdd = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/users/add", data);
      console.log(response, `oke gak??`);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-emerald-500 min-h-screen">
        <div className="flex p-8 justify-center">
          <div className="flex justify-center rounded-xl mt-16 p-5 bg-teal-400">
            <form onSubmit={submitAdd}>
              <div className="sm:col-span-4 mt-4">
                <label className="block text-base font-bold leading-6 text-gray-900">
                  First Name
                </label>
                <div className="mt-2 w-60">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2">
                    <input
                      type="text"
                      name="firstName"
                      onChange={dataHandler}
                      value={data.firstName}
                      className="block flex-1 border-0 rounded-md shadow-sm bg-white py-1.5 pl-1 text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-base font-bold leading-6 text-gray-900">
                  First Name
                </label>
                <div className="mt-2 w-60">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2">
                    <input
                      type="text"
                      name="lastName"
                      onChange={dataHandler}
                      value={data.lastName}
                      className="block flex-1 border-0 rounded-md shadow-sm bg-white py-1.5 pl-1 text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-base font-bold leading-6 text-gray-900">
                  Usia
                </label>
                <div className="mt-2 w-60">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2">
                    <input
                      type="text"
                      name="age"
                      onChange={dataHandler}
                      value={data.age}
                      className="block flex-1 border-0 rounded-md shadow-sm bg-white py-1.5 pl-1 text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-base font-bold leading-6 text-gray-900">
                  Jenis Kelamin
                </label>
                <div className="mt-2 w-60">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2">
                    <input
                      type="text"
                      name="gender"
                      onChange={dataHandler}
                      value={data.gender}
                      className="block flex-1 border-0 rounded-md shadow-sm bg-white py-1.5 pl-1 text-gray-900"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 "
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
