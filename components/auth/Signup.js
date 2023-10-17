"use client";
import React, { useState } from "react";
import styles from "./Signup.module.css";
import Link from "next/link";
export default function signup() {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
  });
  const changeHandler = (e) => {
    switch (e.target.id) {
      case "name":
        setUser({ ...user, name: e.target.value });
        return;
      case "lastname":
        setUser({ ...user, lastname: e.target.value });
        return;
      case "email":
        setUser({ ...user, email: e.target.value });
        return;
      case "password":
        setUser({ ...user, password: e.target.value });
        return;
      case "repassword":
        setUser({ ...user, repassword: e.target.value });
        return;
    }
  };
  const clickHandler = async (e) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
          <h1>Todo</h1>
          <h2>Hello, who’s this?</h2>
        </div>

        <div className={styles.forminput}>
          <div className={styles.nameandlast}>
            <div className={styles.name}>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <input
                onChange={(e) => changeHandler(e)}
                placeholder="Sadra"
                id="name"
                type="text"
              />
            </div>
            <div className={styles.lastname}>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Lastname
              </label>

              <input
                onChange={(e) => changeHandler(e)}
                placeholder="Ka"
                id="lastname"
                type="text"
              />
            </div>
          </div>
          <div className={styles.email}>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <input
              onChange={(e) => changeHandler(e)}
              placeholder="example@gmail.com"
              id="email"
              type="email"
            />
          </div>
          <div className={styles.password}>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              onChange={(e) => changeHandler(e)}
              placeholder="At least 8 characters"
              id="password"
              type="password"
            />
            <label
              htmlFor="repassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <input
              onChange={(e) => changeHandler(e)}
              placeholder="Confirm Password"
              id="repassword"
              type="password"
            />
          </div>
        </div>
        <div className={styles.button}>
          <button onClick={(e) => clickHandler(e)}>Sign up</button>
        </div>
        {/* <div className={styles.google}>
          <WithGoogle />
        </div> */}
        <div className={styles.login}>
          <span>
            Already have an account? <Link href={"/login"}> Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
