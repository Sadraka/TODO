"use client";
import React, { useEffect, useState } from "react";
import Cards from "../modules/Cards";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Todos() {
  const [user, setUser] = useState("");
  const { status, data } = useSession();
  const [saveload, setSaveload] = useState(false);
  const [deleteload, setDeleteload] = useState(false);
  const [delstatus, setDelstatus] = useState(false);

  const fethData = async () => {
    const res = await fetch("/api/todo/get");
    const data = await res.json();
    setUser(data.user);
  };

  const postData = async (index) => {
    setSaveload(true);
    setDeleteload(true);

    const res = await fetch("/api/todo/post", {
      method: "POST",
      body: JSON.stringify(index),
      "Content-Type": "application/json",
    });
    const data = await res.json();

    if (data.message === "success") {
      setSaveload(false);
      setDeleteload(false);
      setDelstatus(true);
    }
  };

  useEffect(() => {
    fethData();
  }, []);
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/");
    return;
  }

  return (
    <div className="mt-7">
      {user && (
        <Cards
          todo={user.todo}
          postData={postData}
          saveload={saveload}
          deleteload={deleteload}
          delstatus={delstatus}
        />
      )}
    </div>
  );
}
