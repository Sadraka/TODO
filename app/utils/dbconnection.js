import mongoose from "mongoose";

async function dbconnection() {
  if (mongoose.connections.readyState[0]) return;
  await mongoose.connect(process.env.MD_URI);
  console.log("DB connected");
}

export default dbconnection;
