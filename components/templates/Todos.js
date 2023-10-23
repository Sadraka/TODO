"use client";
import React, { useEffect, useState } from "react";
import Cards from "../modules/Cards";
import { useSession } from "next-auth/react";

export default function Todos() {
  const [user, setUser] = useState("");
  const { status, data } = useSession();

  const fethData = async () => {
    const res = await fetch("/api/todo/get");
    const data = await res.json();
    setUser(data.user);
  };

  const postData = async (index) => {
    const res = await fetch("/api/todo/post", {
      method: "POST",
      body: JSON.stringify(index),
      "Content-Type": "application/json",
    });
    const data = await res.json();
    // console.log(data, "POST DATA");
  };

  useEffect(() => {
    fethData();
  }, []);
  return (
    <div className="mt-7">
      {user && <Cards todo={user.todo} postData={postData} />}
    </div>
  );
}
