import React from "react";
import styles from "./LandingButton.module.css";
import { Button } from "@mui/material";
export default function LandingButton() {
  const clickHandler = () => {};
  return (
    <div className={styles.container}>
      <Button onClick={() => clickHandler()}>Get Start</Button>
    </div>
  );
}
