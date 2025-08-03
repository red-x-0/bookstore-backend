import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

// Define the Schema (the structure of the author)
const authorSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name must be at most 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name must be at most 50 characters"],
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
      trim: true,
      minlength: [3, "Nationality must be at least 3 characters"],
      maxlength: [50, "Nationality must be at most 50 characters"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
      default: "default.png",
      validate: {
        validator: function (v: string) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(v) || v === "default.png";
        },
        message: "Invalid image URL format",
      },
    },
    // user: { 
    //   type: Schema.Types.ObjectId, 
    //   ref: "User", 
    //   required: [true, "User is required"],
    // },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create a model based on that schema
const Author = model("Author", authorSchema);

// Export the model
export default Author;
