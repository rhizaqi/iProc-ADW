"use client";
import { useParams } from "next/navigation";
import React from "react";

const Users = () => {
  const params = useParams();

  

  return <div>ni data per id {params.id}</div>;
};

export default Users;
