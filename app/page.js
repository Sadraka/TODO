import Link from "next/link";

export default async function Home() {
  return (
    <>
      <h1 className="underline">Todo list</h1>
      <Link href={"/login"}>Login</Link>
    </>
  );
}
