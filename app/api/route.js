import { hashPassword } from "@/app/utils/auth";
import DBconnection from "@/app/utils/dbconnection";

import User from "@/models/User";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    await DBconnection();

    try {
      const { email, password } = await req.json();
      if (!email || !password) {
        return NextResponse.json(
          {
            message: "Invalid Data",
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
      const newUser = await User.create({ email: email, password: hashPass });
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
