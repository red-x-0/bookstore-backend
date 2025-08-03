import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

// Define the Schema (the structure of the book)
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [100, "Title must be at most 100 characters"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "Author is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description must be at most 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    cover: {
      type: String,
      required: [true, "Cover type is required"],
      enum: ["soft cover", "hard cover"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create a model based on that schema
const Book = model("Book", bookSchema);

// Export the model
export default Book;
