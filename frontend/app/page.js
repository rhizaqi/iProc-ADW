"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      redirect("login");
    }
  });

  return <div>Home page</div>;
};  
export default Home;
