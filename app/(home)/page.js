"use client";
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
      <div>
        <h1 className="underline">Todo list</h1>
        {status === "unauthenticated" && (
          <div>
            <Link
              href={"/login"}
              className="text-3xl bg-gray-400 ml-1 transition-all duration-150 hover:opacity-60 text-white rounded-5"
            >
              Login
            </Link>
          </div>
        )}
        {status === "authenticated" && (
          <div>
            <h1>
              Hello {data.user.name}
              <br />
              your email is : {data.user.email}
              <br />
              {data.user.image && (
                <Image
                  width={50}
                  height={50}
                  src={data.user.image}
                  alt={data.user.name}
                />
              )}
            </h1>
            <button
              onClick={() => clickHandler()}
              className="text-3xl bg-gray-100 ml-1 transition-all duration-150 hover:opacity-60 text-black rounded-5"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </>
  );
}
