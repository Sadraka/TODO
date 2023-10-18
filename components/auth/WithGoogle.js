import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import googlesvg from "../../global/google.svg";
export default function WithGoogle() {
  const signInHandler = () => {
    signIn("google");
  };
  return (
    <div>
      <button onClick={() => signInHandler()}>
        <Image
          src={googlesvg}
          width={50}
          className="mt-1"
          alt="Login with google"
        />
      </button>
    </div>
  );
}
