"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WithGoogle from "./WithGoogle";
import Link from "next/link";
import error from "@/app/utils/error";
export { SessionProvider } from "next-auth/react";
import styles from "./Login.module.css";
import { Notify } from "notiflix";

export default function Login() {
  const [userdata, setUserdata] = useState({ email: "", password: "" });
  const [isclick, setIsclick] = useState(false);
  const [showerror, setShowerror] = useState(false);
  const err = error(userdata);
  // protect client side page
  // useSession looklike useState ==> rerender component
  const { data, status } = useSession();
  const router = useRouter();
  /////////////////////////////////
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
  ////////////////////////////////
  const clickHandler = async () => {
    setIsclick(true);
    if (err.loginResult()) {
      setShowerror(false);
      const res = await signIn("credentials", {
        email: userdata.email,
        password: userdata.password,
        redirect: false,
        //In case of error, it does not redirect to the api page
      });
      if (!res.error) {
        Notify.success(`Welcome`, {
          position: "center-bottom",
          success: {
            background: "#000",
            textColor: "#fff",
            notiflixIconColor: "#fff",
          },
        });
        router.replace("/");
        console.log(res);
      }
      if (res.error) {
        if (res.error === "Illegal arguments: string, undefined") {
          Notify.failure("Please login with your Google account", {
            position: "center-bottom",
            clickToClose: true,
            failure: {
              background: "rgba(107, 114, 128)",
              notiflixIconColor: "#fff",
            },
          });
        } else {
          Notify.failure(res.error, {
            position: "center-bottom",
            clickToClose: true,
            failure: {
              background: "rgba(107, 114, 128)",
              notiflixIconColor: "#fff",
            },
          });
        }
      }
    } else {
      setShowerror(true);
    }
    setIsclick(false);
  };

  useEffect(() => {
    console.log(data, status);
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [data]);
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
            <Link href={"/"}>Todo</Link>
          </h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-7">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-400"
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
                  className="block w-full outline-none rounded-md border-0 py-2.5  p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400   sm:text-sm sm:leading-6"
                />
              </div>

              <div className={styles.diverror}>
                {showerror && !err.emailResult && (
                  <span className={styles.texterror}>Email is not valid!</span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-400"
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
                  className=" block w-full outline-none rounded-md border-0 py-2.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-800  sm:text-sm sm:leading-6"
                />
              </div>

              <div className={styles.diverror}>
                {showerror && !err.passwordResult && (
                  <span className={styles.texterror}>
                    Enter correct password{" "}
                  </span>
                )}
              </div>
            </div>

            <div className={isclick ? styles.clicked : styles.button}>
              <button
                onClick={() => clickHandler()}
                disabled={isclick}
                type="submit"
              >
                Sign in
              </button>
            </div>
            <div className="text-gray-500 text-center mt-1 ">
              <WithGoogle />
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
