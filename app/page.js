"use client";
import Link from "next/link";
import { Notify } from "notiflix";

export default async function Home() {
  return (
    <>
      <h1 className="underline">Todo list</h1>
      <Link href={"/login"}>Login</Link>
      <button
        onClick={() =>
          Notify.success("salam", {
            clickToClose: true,
            position: "",
            success: {
              background: "#32c682",
              textColor: "#fff",
              childClassName: "notiflix-notify-success",

              fontAwesomeClassName: "fas fa-check-circle",
              fontAwesomeIconColor: "rgba(250,250,250,0.2)",
              backOverlayColor: "rgba(50,198,130,0.2)",
            },
          })
        }
      >
        Click
      </button>
    </>
  );
}
