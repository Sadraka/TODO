"use client";
import React, { useEffect, useRef } from "react";
import styles from "./LandingHeader.module.css";
import Typed from "typed.js";
export default function LandingHeader() {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "<h2>Get Things Done: Your Personal To-Do Helper</h2>",
        "<h1>Streamline Your Productivity with TODO</h1>",
        "<h1> TODO:Your Tasks, Your Way</h1>",
      ],
      typeSpeed: 50,
    });
    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.span}>
        <span ref={el} />
      </div>

      <h3>
        Todo - Your Daily Tasks, Simplified. Achieve more in less time with our
        intuitive to-do list platform. Say goodbye to chaos and hello to
        productivity!
      </h3>
    </div>
  );
}
