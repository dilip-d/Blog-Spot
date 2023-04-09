import mongoose from "mongoose";

const URI = process.env.MONGODB_URL;

async function connect() {
  try {
    await mongoose.connect(URI!);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
}

connect();