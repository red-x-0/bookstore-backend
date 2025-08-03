import { Request, Response } from "express";
import validateBook from "../validation/validateBook";
import bookSchema from "../models/bookSchema";

/**
 * @desc Get all books
 * @route GET /books
 * @access Public
 */
const books_get = async (req: Request, res: Response): Promise<void> => {
    // Pagination and sorting can be added here if needed
    const { page = 1, limit = 2 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;
  try {
    const books = await bookSchema.find()
    .skip(skip)
    .limit(limitNumber)
    .populate("author", ["_id", "firstName", "lastName"]);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

/**
 * @desc Get a single book by ID
 * @route GET /books/:id
 * @access Public
 */
const book_get = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await bookSchema.findById(req.params.id).populate("author", ["_id", "firstName", "lastName"]);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
};

/**
 * @desc Create a new book
 * @route POST /books
 * @access Public
 */
const book_post = async (req: Request, res: Response): Promise<void> => {
  const { error } = validateBook.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const book = new bookSchema(req.body);
  try {
    const savedBook = await book.save();
    await savedBook.populate("author", ["_id", "firstName", "lastName"]); // Ensure populate completes
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: "Error saving book" });
  }
};

/**
 * @desc Update a book by ID
 * @route PUT /books/:id
 * @access Public
 */
const book_put = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = validateBook.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const updatedBook = await bookSchema
      .findByIdAndUpdate(
        req.params.id, 
        { $set: req.body }, 
        { new: true, runValidators: true }
      )
      ;

    if (updatedBook) {
      await updatedBook.populate("author", ["_id", "firstName", "lastName"]); // Ensure populate is awaited
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
};

/**
 * @desc Delete a book by ID
 * @route DELETE /books/:id
 * @access Public
 */
const book_delete = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBook = await bookSchema.findByIdAndDelete(req.params.id);
    if (deletedBook) {
      res.status(200).json({ message: "Book deleted" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};

export {
  books_get,
  book_get,
  book_post,
  book_put,
  book_delete
};
