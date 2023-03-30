import mongoose from "mongoose";

interface IUser {
  firstName: string;
  lastName: string;
  password: string;
  mobileNumber: string;
  country: string;
  email: string;
  runningBalance: {
    wallet: number;
    gold: number;
    goldPrice: number;
  };
}

interface UserModelInterface extends mongoose.Model<IUser> {
  build(todo: IUser): IUser;
}

interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  password: string;
  mobileNumber: string;
  country: string;
  email: string;
  runningBalance: {
    wallet: number;
    gold: number;
    goldPrice: number;
  };
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },

  lastName: {
    type: String,
    required: false,
  },

  password: {
    type: String,
    required: false,
  },

  mobileNumber: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  email: {
    type: String,
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

// enforces strict type checking
userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

const User = mongoose.model<UserDoc, UserModelInterface>("User", userSchema);
export { User };

// User.build({
//     firstName: "test",
//     lastName: "test",
//     password: "test",
//     mobileNumber: "test",
//     country: "test",
//     email: "",
//     runningBalance: {
//         wallet: 0,
//         gold: 0,
//         goldPrice: 0
//     }
// })
