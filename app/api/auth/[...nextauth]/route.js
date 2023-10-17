import { verifiyPass } from "@/app/utils/auth";
import clientPromise from "@/lib/mongoDB";
import User from "@/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import DBconnection from "@/app/utils/DBconnection";
import { NextResponse } from "next/server";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentails, req) {
        const { email, password } = credentails;
        try {
          console.log(email);
          await DBconnection();
        } catch (err) {
          throw new Error("Error in connecting to Db");
        }
        if (!email || !password) {
          throw new Error("Invalid data");
        }
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error("User dosen't exist");
        }
        const isValid = await verifiyPass(password, user.password);
        if (!isValid) {
          throw new Error("User or Password incorect");
        }
        return { email };
      },
    }),
    // Iran IPs are BLOCKED
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
