"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "../modules/ProfileCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState("");
  const { status, data } = useSession();

  const router = useRouter();

  const fethData = async () => {
    const res = await fetch("/api/todo/get");
    const data = await res.json();
    setUser(data.user);
  };
  useEffect(() => {
    if (status === "authenticated") {
      fethData();
    }
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);
  return (
    <div>
      <ProfileCard user={user} />
    </div>
  );
}
