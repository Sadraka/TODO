import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import googlesvg from "../../global/google.svg";
import styles from "./WithGoogle.module.css";
export default function WithGoogle() {
  const [isclick, setIsclick] = useState(false);

  const signInHandler = () => {
    setIsclick(true);
    console.log("click");
    signIn("google");
  };
  return (
    <div className={styles.container}>
      <button
        onClick={() => signInHandler()}
        className={isclick ? styles.clicked : styles.button}
        disabled={isclick}
      >
        <Image
          src={googlesvg}
          width={40}
          className="mt-1"
          alt="Login with google"
        />
        Sign in With Google
      </button>
    </div>
  );
}
