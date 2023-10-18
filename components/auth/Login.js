"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WithGoogle from "./WithGoogle";
import Link from "next/link";
export { SessionProvider } from "next-auth/react";

export default function Login() {
  const rotuer = useRouter();

  // protect client side page
  // useSession looklike useState ==> rerender component
  const { data, status } = useSession();
  console.log("signin ", data);

  const [userdata, setUserdata] = useState({ email: "", password: "" });
  const changeHandler = (e) => {
    switch (e.target.id) {
      case "email":
        setUserdata({ ...userdata, email: e.target.value });
        return;
      case "password":
        setUserdata({ ...userdata, password: e.target.value });
        return;
    }
  };
  const clickHandler = async () => {
    const res = await signIn("credentials", {
      email: userdata.email,
      password: userdata.password,
      redirect: "/dashboard",
    });
    console.log(res);
  };
  return (
    // <>
    //   <h1>Sign in</h1>
    //   <input
    //     onChange={(e) => changeHandler(e)}
    //     value={userdata.email}
    //     type="text"
    //     placeholder="email"
    //   />
    //   <input
    //     onChange={(e) => changeHandler(e)}
    //     value={userdata.password}
    //     type="password"
    //     placeholder="password"
    //   />
    //   <button onClick={() => clickHandler()}>sign in</button>
    //   <WithGoogle />
    // </>
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Todo
          </h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => changeHandler(e)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-2.5  p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-gray-700 hover:text-gray-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => changeHandler(e)}
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full rounded-md border-0 py-2.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={clickHandler}
                type="submit"
                className="flex w-full transition-all justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Sign in
              </button>
              <div className="text-gray-500 text-center mt-1">
                <WithGoogle />
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-1rem text-gray-500">
            Not a member?{" "}
            <Link
              href={"/signup"}
              className="font-semibold text-gray-700 hover:text-gray-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
