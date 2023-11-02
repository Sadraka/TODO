"use client";
import React, { useState } from "react";
import styles from "./ProfileCard.module.css";
import Image from "next/image";
import profilesvg from "@/global/profile.svg";
import { Button } from "@mui/material";
import error from "@/app/utils/error";
export default function ProfileCard({ user }) {
  const [pass, setPass] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [password, setPassword] = useState({
    oldpassword: "",
    password: "",
    repassword: "",
  });

  const cliclHandler = (e) => {
    switch (e.target.id) {
      case "change":
        setPass(true);
        return;
      case "submit":
        setSubmit(true);
        const { matchpassword, passwordResult, oldpasswordResult } =
          error(password);
        if (user.password) {
          if (matchpassword && passwordResult && oldpasswordResult) {
            console.log("ok");
          }
        }
        return;
    }
  };
  const changeHandler = (e) => {
    switch (e.target.id) {
      case "password":
        setPassword({ ...password, password: e.target.value });
        return;
      case "repassword":
        setPassword({ ...password, repassword: e.target.value });
        return;
      case "oldpassword":
        setPassword({ ...password, oldpassword: e.target.value });
        return;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <Image src={profilesvg} width={250} alt="Profile" />
        <div className={styles.name}>
          <p>Name : {user && <span>{user.name}</span>}</p>
          <p>
            Lastname :{user && user.lastname && <span>{user.lastname}</span>}
          </p>
          <p>Email : {user && <span>{user.email}</span>}</p>
        </div>
      </div>
      <div className={pass ? styles.clickButton : styles.button}>
        <button onClick={(e) => cliclHandler(e)} id="change">
          Change Password
        </button>
      </div>
      {pass && (
        <div className={styles.input}>
          {user && user.password && (
            <div className={styles.input}>
              <label htmlFor="oldpassword" className={styles.label}>
                Confirm Password
              </label>
              <input
                onChange={(e) => changeHandler(e)}
                placeholder="Old Password"
                id="oldpassword"
                type="password"
              />
            </div>
          )}
          <label htmlFor="password" className={styles.label}>
            New password
          </label>
          <input
            onChange={(e) => changeHandler(e)}
            placeholder="Sa@#1234"
            id="password"
            type="password"
          />
          <label htmlFor="repassword" className={styles.label}>
            Confirm Passwrod
          </label>
          <input
            onChange={(e) => changeHandler(e)}
            placeholder="Sa@#1234"
            id="repassword"
            type="password"
          />

          <div className={submit ? styles.submitButton : styles.button}>
            <button onClick={(e) => cliclHandler(e)} id="submit">
              Save Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
