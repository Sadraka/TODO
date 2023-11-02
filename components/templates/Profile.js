"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "../modules/ProfileCard";

export default function Profile() {
  const [user, setUser] = useState("");
  console.log(user);

  const fethData = async () => {
    const res = await fetch("/api/todo/get");
    const data = await res.json();
    setUser(data.user);
  };
  useEffect(() => {
    fethData();
  }, []);
  return (
    <div>
      <ProfileCard user={user} />
    </div>
  );
}
