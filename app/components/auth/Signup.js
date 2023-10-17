"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Signup() {
  const [user, setUser] = useState({ email: "", password: "" });
  const changeHandler = (e) => {
    console.log(user);

    switch (e.target.id) {
      case "email":
        setUser({ ...user, email: e.target.value });
        return;
      case "password":
        setUser({ ...user, password: e.target.value });
        return;
    }
  };
  return <></>;
}
