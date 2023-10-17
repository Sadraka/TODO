import mongoose from "mongoose";

export default async function DBconnection() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MD_URI);
  console.log("DB connected");
}
