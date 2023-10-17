import { hashPassword } from "@/app/utils/auth";

import User from "@/models/User";
import { NextResponse } from "next/server";
import DBconnection from "../../../utils/DBconnection";
export async function POST(req) {
  try {
    await DBconnection();

    try {
      const { email, password, repassword, name, lastname } = await req.json();
      console.log(email);
      if (!email || !password || !name || !lastname || !repassword) {
        return NextResponse.json(
          {
            message: "Invalid Data",
            status: 422,
          },
          { status: 422 }
        );
      }
      if (password !== repassword) {
        return NextResponse.json(
          {
            message: "Password not match",
            status: 422,
          },
          { status: 422 }
        );
      }
      const existedUser = await User.findOne({ email: email });
      if (existedUser) {
        return NextResponse.json(
          {
            message: "User already exists",
            status: 422,
          },
          { status: 422 }
        );
      }
      const hashPass = await hashPassword(password);
      const newUser = await User.create({
        email: email,
        password: hashPass,
        name: name,
        lastname: lastname,
      });
      return NextResponse.json({ message: "success", newUser });
    } catch (err) {
      return NextResponse.json({ message: "error", err });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "connecting to DB has been failed", status: 500, err },
      { status: 500 }
    );
  }
}
