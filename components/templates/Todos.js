"use client";
import React, { useEffect, useState } from "react";
import Cards from "../modules/Cards";

export default function Todos() {
  const [user, setUser] = useState("");
  const fethData = async () => {
    const res = await fetch("/api/todo/get");
    const data = await res.json();
    setUser(data.user);
  };

  useEffect(() => {
    fethData();
  }, []);
  return (
    <div className="mt-7">
      {user && user.todo.length === 0 && <Cards todo={user.todo} />}
      {user &&
        user.todo.length > 0 &&
        user.todo.map((item) => <Cards todo={item} />)}
    </div>
  );
}
