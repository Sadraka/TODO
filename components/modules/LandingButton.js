import React from "react";
import styles from "./LandingButton.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
export default function LandingButton() {
  const router = useRouter();
  const clickHandler = () => {
    router.push("/login");
  };
  return (
    <div className={styles.container}>
      <Button style={{ textTransform: "none" }} onClick={() => clickHandler()}>
        <p>Get Start</p>
      </Button>
    </div>
  );
}
