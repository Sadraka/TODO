"use client";
import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import Link from "next/link";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import error from "@/app/utils/error";
import Notiflix from "notiflix";

export default function signup() {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [isclick, setIsclick] = useState(false);
  const [showerror, setShowerror] = useState(false);

  const err = error(user);

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
    setIsclick(true);
    if (err.signupResult()) {
      setShowerror(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data) {
        setIsclick(false);
        if (data.message === "success") {
          Notify.success(`Welcome ${data.newUser.name}`, {
            position: "center-bottom",
            success: {
              background: "#000",
              textColor: "#fff",
              notiflixIconColor: "#fff",
            },
          });
        } else {
          Notify.failure(data.message, {
            position: "center-bottom",
            failure: {
              background: "rgba(107, 114, 128)",
              notiflixIconColor: "#fff",
            },
          });
        }
      }
    } else {
      setShowerror(true);
      setIsclick(false);
    }
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
                Name *
              </label>

              <input
                onChange={(e) => changeHandler(e)}
                placeholder="Sadra"
                id="name"
                type="text"
              />
              {showerror && !err.nameResult && (
                <span className={styles.texterror}>Name requared !</span>
              )}
              {!showerror && <span className={styles.texterror}></span>}
            </div>

            <div className={styles.lastname}>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Lastname *
              </label>

              <input
                onChange={(e) => changeHandler(e)}
                placeholder="Ka"
                id="lastname"
                type="text"
              />
              {showerror && !err.lastnameResult && (
                <span className={styles.texterror}>Lastname requared !</span>
              )}
              {!showerror && <span className={styles.texterror}></span>}
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
            {showerror && !err.emailResult && (
              <span className={styles.texterror}>Email is not valid!</span>
            )}
            {!showerror && <span className={styles.texterror}></span>}
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
            {showerror && !err.passwordResult && (
              <span className={styles.texterror}>
                The password should be more than 8 & contain letters and numbers
              </span>
            )}
            {!showerror && <span className={styles.texterror}></span>}

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
            {showerror && !err.matchpassword && (
              <span className={styles.texterror}>
                The passwords are not identical to each other !
              </span>
            )}
            {!showerror && <span className={styles.texterror}></span>}
          </div>
        </div>
        <div className={isclick ? styles.clicked : styles.button}>
          <button onClick={(e) => clickHandler(e)} disabled={isclick}>
            Sign up
          </button>
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
