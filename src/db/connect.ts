import mongoose, { type ConnectOptions } from "mongoose";

const connectDB = () => {
  return mongoose.connect(
    "mongodb://localhost:27017/todo",
    {} as ConnectOptions
  );
};

export { connectDB };
