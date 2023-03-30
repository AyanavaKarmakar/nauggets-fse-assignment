import express from "express";
import { json } from "body-parser";
import { todoRouter } from "./routes/todo";
import { connectDB } from "./db/connect";

const app = express();
app.use(json());
app.use(todoRouter);

const start = async () => {
  try {
    // await connectDB();
    // console.log("connected to db");

    app.listen(3000, () => {
      console.log(`Server is running on port 3000`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
