import React from "react";
import LandingHeader from "../modules/LandingHeader";
import styles from "./Landing.module.css";
import LandingButton from "../modules/LandingButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Landing() {
  const { data, status } = useSession();
  const router = useRouter();
  console.log(data);
  if (status === "authenticated") {
    router.push("/todos");
    return;
  }
  if (status === "unauthenticated") {
    return (
      <div className={styles.container}>
        <LandingHeader />
        <LandingButton />
      </div>
    );
  }
}
