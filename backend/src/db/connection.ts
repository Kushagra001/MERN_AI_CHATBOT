import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not defined");
    }
    await connect(mongoUrl);
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Could not Connect To MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Could not Disconnect From MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };
