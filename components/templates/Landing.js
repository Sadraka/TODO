import React from "react";
import LandingHeader from "../modules/LandingHeader";
import styles from "./Landing.module.css";
import LandingButton from "../modules/LandingButton";
export default function Landing() {
  return (
    <div className={styles.container}>
      <LandingHeader />
      <LandingButton />
    </div>
  );
}
