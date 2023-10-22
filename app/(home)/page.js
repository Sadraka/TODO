"use client";

import Todos from "@/components/templates/Todos";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data, status } = useSession();
  console.log(status);
  const clickHandler = async () => {
    await signOut({
      redirect: "/",
    });
  };
  return (
    <>
      <Todos />
    </>
  );
}
