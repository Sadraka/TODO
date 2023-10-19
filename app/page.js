"use client";
import autoprefixer from "autoprefixer";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Notify } from "notiflix";

export default function Home() {
  const { data, status } = useSession();
  const clickHandler = () => {
    signOut();
  };
  return (
    <>
      <h1 className="underline">Todo list</h1>
      {status === "unauthenticated" && (
        <div>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
      {status === "authenticated" && (
        <div>
          <h1>
            Hello {data.user.name}
            <br />
            your email is : {data.user.email}
            <br />
            <Image
              width={50}
              height={50}
              src={data.user.image}
              alt={data.user.name}
            />
          </h1>
          <button onClick={() => clickHandler()}>Sign Out</button>
        </div>
      )}
    </>
  );
}
