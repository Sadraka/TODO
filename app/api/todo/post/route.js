import DBconnection from "@/app/utils/DBconnection";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await DBconnection();
    try {
      const session = await getServerSession();

      if (!session) {
        return NextResponse.json(
          { message: "You ara not logged in", status: 401 },
          { status: 401 }
        );
      }
      const todo = await req.json();
      console.log(todo);
      if (!todo) {
        return NextResponse.json(
          { message: "invalid data", status: 400 },
          { status: 400 }
        );
      }
      // check if title is empty ==> error

      const user = await User.findOne({ email: session.user.email });
      user.todo = todo;
      user.save();
      return NextResponse.json({ message: "success" }, { status: "201" });
    } catch (err) {
      return NextResponse.json({ message: "UnAuthorization" }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Connection to DB has been Failed" },
      { status: 500 }
    );
  }
}
