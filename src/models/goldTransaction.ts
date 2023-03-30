import mongoose from "mongoose";

interface IGoldTransaction {
  userId: mongoose.Types.ObjectId;
  entityUser: mongoose.Types.ObjectId;
  quantity: number;
  amount: number;
  type: "CREDIT" | "DEBIT";
  status: "FAILED" | "SUCCESS" | "WAITING" | "CANCELED" | "PENDING";
  runningBalance: {
    wallet: number;
    gold: number;
    goldPrice: number;
  };
}

interface GoldTransactionModel extends mongoose.Model<IGoldTransaction> {
  build(todo: IGoldTransaction): IGoldTransaction;
}

interface GoldTransactionDoc extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  entityUser: mongoose.Types.ObjectId;
  quantity: number;
  amount: number;
  type: "CREDIT" | "DEBIT";
  status: "FAILED" | "SUCCESS" | "WAITING" | "CANCELED" | "PENDING";
  runningBalance: {
    wallet: number;
    gold: number;
    goldPrice: number;
  };
}

const goldTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },

  entityUser: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },

  quantity: {
    type: Number,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    enum: ["CREDIT", "DEBIT"],
    required: true,
  },

  status: {
    type: String,
    enum: ["FAILED", "SUCCESS", "WAITING", "CANCELED", "PENDING"],
    required: true,
  },

  runningBalance: {
    wallet: {
      type: Number,
      required: true,
    },

    gold: {
      type: Number,
      required: true,
    },

    goldPrice: {
      type: Number,
      required: true,
    },
  },
});

goldTransactionSchema.statics.build = (goldTransaction: IGoldTransaction) => {
  return new GoldTransaction(goldTransaction);
};

const GoldTransaction = mongoose.model<
  GoldTransactionDoc,
  GoldTransactionModel
>("GoldTransaction", goldTransactionSchema);

export { GoldTransaction };
