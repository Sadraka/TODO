import { NextResponse } from "next/server";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { hashPassword, verifiyPass } from "@/app/utils/auth";
import DBconnection from "@/app/utils/DBconnection";

export async function POST(req) {
  try {
    await DBconnection();

    try {
      const { password, repassword, oldpassword } = await req.json();

      //getServerSession get token and validate it
      const session = await getServerSession();
      if (!session) {
        return NextResponse.json(
          { message: "You ara not logged in", status: 401 },
          { status: 401 }
        );
      }
      if ((!password, !repassword, !oldpassword)) {
        return NextResponse.json(
          { message: "invalid data", status: 400 },
          { status: 400 }
        );
      }

      const user = await User.findOne({ email: session.user.email });
      if (user) {
        if (password !== repassword) {
          return NextResponse.json(
            { message: "Password was not same" },
            { status: 401 }
          );
        }
        const verifyPass = await verifiyPass(oldpassword, user.password);
        if (verifyPass) {
          const hashPass = await hashPassword(password);
          user.password = hashPass;
          user.updateAt = Date.now();
          await user.save();
          return NextResponse.json(
            {
              message: "success",
              status: 200,
              newpassword: password,
              email: session.user.email,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { message: "Password was wrong", status: 400 },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "User not found", status: 404 },
          { status: 404 }
        );
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "Acourding error", err },
        { status: 500 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "connecting to DB has been failed", status: 500, err },
      { status: 500 }
    );
  }
}
