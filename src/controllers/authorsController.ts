import { Request, Response } from "express";
import validateAuthor from "../validation/validateAuthor";
import authorSchema from "../models/authorSchema";

/**
 * @desc Get all authors
 * @route GET /authors
 * @access Public
 */
const authors_get = async (req: Request, res: Response): Promise<void> => {
  // Pagination and sorting can be added here if needed
  const { page = 1, limit = 2 } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  const skip = (pageNumber - 1) * limitNumber;
  try {
    const authors = await authorSchema.find().skip(skip).limit(limitNumber);
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching authors" });
  }
};

/**
 * @desc Get a single author by ID
 * @route GET /authors/:id
 * @access Public
 */
const author_get = async (req: Request, res: Response): Promise<void> => {
  try {
    const author = await authorSchema.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching author" });
  }
};

/**
 * @desc Create a new author
 * @route POST /authors
 * @access Public
 */
const author_post = async (req: Request, res: Response): Promise<void> => {
  const { error } = validateAuthor.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const author = new authorSchema(req.body);
  try {
    const savedAuthor = await author.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json({ message: "Error creating author" });
  }
};

/**
 * @desc Update an author by ID
 * @route PUT /authors/:id
 * @access Public
 */
const author_put = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = validateAuthor.validate(req.body, { allowUnknown: true, stripUnknown: true });
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const updatedAuthor = await authorSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Only update provided fields
      { new: true, runValidators: true }
    );

    if (updatedAuthor) {
      res.status(200).json(updatedAuthor);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating author" });
  }
};


/**
 * @desc Delete an author by ID
 * @route DELETE /authors/:id
 * @access Public
 */
const author_delete = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedAuthor = await authorSchema.findByIdAndDelete(req.params.id);
    if (deletedAuthor) {
      res.status(200).json({ message: "Author deleted" });
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting author" });
  }
};

export {
  authors_get,
  author_get,
  author_post,
  author_put,
  author_delete
};
