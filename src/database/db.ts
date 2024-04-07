import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
let cachedConnection: typeof mongoose | null = null;

export default async function ConnectDb() {
  if (cachedConnection) {
    return cachedConnection;
  }
  try {
    const db = await mongoose.connect(MONGODB_URI);
    cachedConnection = db;
    return db;
  } catch (error) {
    console.error("Connection error:", error);
    throw new Error("Unable to connect to the server");
  }
}
