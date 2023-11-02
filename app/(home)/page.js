"use client";

import Landing from "@/components/templates/Landing";
import Todos from "@/components/templates/Todos";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function Home() {
  const el = useRef(null);
  const { data, status } = useSession();

  const clickHandler = async () => {
    await signOut({
      redirect: "/",
    });
  };
  return (
    <>
      <Landing />
      <span ref={el}></span>
    </>
  );
}
