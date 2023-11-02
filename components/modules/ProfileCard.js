"use client";
import React, { useState } from "react";
import styles from "./ProfileCard.module.css";
import Image from "next/image";
import profilesvg from "@/global/profile.svg";
import { Button } from "@mui/material";
export default function ProfileCard({ user }) {
  const [pass, setPass] = useState(false);
  const [submit, setSubmit] = useState(false);
  const cliclHandler = () => {
    setPass(true);
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
      <div className={pass ? styles.clickbutton : styles.button}>
        <button onClick={(e) => cliclHandler(e)} id="change">
          Change Password
        </button>
      </div>
      {pass && (
        <div className={styles.input}>
          {user && user.password && (
            <input
              onChange={(e) => changeHandler(e)}
              placeholder="Old Password"
            />
          )}
          <input
            onChange={(e) => changeHandler(e)}
            placeholder="New Password"
          />
          <input
            onChange={(e) => changeHandler(e)}
            placeholder="Confirm Password"
          />

          <div className={styles.button}>
            <button onClick={(e) => cliclHandler(e)} id="submit">
              Save Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
