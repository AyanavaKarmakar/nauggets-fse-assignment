import express, { type Request, type Response } from "express";
import { WalletTransaction } from "../models/walletTransaction";
import { GoldTransaction } from "../models/goldTransaction";
import { User } from "../models/User";

const router = express.Router();

router.get("/portfolio/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // retrive user's wallet transactions
    const walletTransactions = await WalletTransaction.find({ userId });

    // retrive user's gold transactions
    const goldTransactions = await GoldTransaction.find({ userId });

    // calculate net funds added to the wallet
    const netFundsAdded = walletTransactions.reduce((acc, curr) => {
      if (curr.type === "CREDIT") {
        return acc + curr.amount;
      } else {
        return acc - curr.amount;
      }
    }, 0);

    // get current funds in wallet
    const currentFund = user.runningBalance.wallet;

    // calculate net growth or loss
    let netGrowthOrLoss = 0;

    goldTransactions.forEach((transaction) => {
      if (transaction.type === "CREDIT") {
        netGrowthOrLoss += transaction.amount;
      } else {
        netGrowthOrLoss -= transaction.amount;
      }
    });

    const currentGoldValue =
      user.runningBalance.gold * user.runningBalance.goldPrice;

    netGrowthOrLoss += currentGoldValue - currentFund - netFundsAdded;

    // calculate gain loss or percentage
    const gainOrLossPercentage = (
      (netGrowthOrLoss / currentFund) *
      100
    ).toFixed(2);

    res.status(200).json({
      netFundsAdded,
      currentFund,
      netGrowthOrLoss,
      gainOrLossPercentage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export { router as profitAndLossRouter };
