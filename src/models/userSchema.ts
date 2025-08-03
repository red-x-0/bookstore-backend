import { Schema as _Schema, model, Document } from "mongoose";
const Schema = _Schema;
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  generateAuthToken: () => string; // <- add this!
}


// Define the Schema (the structure of the user)
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username must be at most 30 characters"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    isAdmin: {
      type: Boolean,
      default: false, // Default value is false (regular user)
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// ✅ TS-safe method with env guard
userSchema.methods.generateAuthToken = function (this: IUser): string {
  const payload = {
    id: this._id,
    isAdmin: this.isAdmin,
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET in environment variables");
  }

  return jwt.sign(payload, secret as jwt.Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  } as jwt.SignOptions);
};
// Create a model based on that schema
const User = model<IUser>("User", userSchema);

// Export the model
export default User;

