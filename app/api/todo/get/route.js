import DBconnection from "@/app/utils/DBconnection";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { verifiyPass, verifiyToken } from "@/app/utils/auth";
export async function GET() {
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

      const user = await User.findOne({ email: session.user.email });
      return NextResponse.json({ user }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: err }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "connecting to DB has been failed", status: 500, err },
      { status: 500 }
    );
  }
}
