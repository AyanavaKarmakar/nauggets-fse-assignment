import express from "express";
// import { connectDB } from "./db/connect";
import { profitAndLossRouter } from "./routes/profitAndLoss";

const app = express();

app.use(profitAndLossRouter);

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
