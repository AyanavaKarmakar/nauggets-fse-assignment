import mongoose from "mongoose";

interface IWalletTransaction {
  userId: mongoose.Types.ObjectId;
  amount: number;
  type: "CREDIT" | "DEBIT";
  status: "FAILED" | "SUCCESS" | "WAITING" | "CANCELED" | "PENDING";
  runningBalance: {
    wallet: number;
    loyaltyPoints: number;
    gold: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

interface WalletTransactionModelInterface
  extends mongoose.Model<IWalletTransaction> {
  build(transaction: IWalletTransaction): IWalletTransaction;
}

interface WalletTransactionDoc extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  type: "CREDIT" | "DEBIT";
  status: "FAILED" | "SUCCESS" | "WAITING" | "CANCELED" | "PENDING";
  runningBalance: {
    wallet: number;
    loyaltyPoints: number;
    gold: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const walletTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },

  amount: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    required: true,
    enum: ["CREDIT", "DEBIT"],
  },

  status: {
    type: String,
    required: true,
    enum: ["FAILED", "SUCCESS", "WAITING", "CANCELED", "PENDING"],
  },

  runningBalance: {
    wallet: {
      type: Number,
      required: true,
    },
    loyaltyPoints: {
      type: Number,
      required: true,
    },
    gold: {
      type: Number,
      required: true,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

walletTransactionSchema.statics.build = (transaction: IWalletTransaction) => {
  return new WalletTransaction(transaction);
};

const WalletTransaction = mongoose.model<
  WalletTransactionDoc,
  WalletTransactionModelInterface
>("WalletTransaction", walletTransactionSchema);

export { WalletTransaction };
