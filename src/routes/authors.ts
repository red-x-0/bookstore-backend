import { Router } from 'express';
const router = Router();
import { authors_get, author_get, author_post, author_put, author_delete } from "../controllers/authorsController";

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: API endpoints for managing authors
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     description: Fetches authors from the database with pagination.
 *     tags: [Authors]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (starting from 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 2
 *         description: Number of authors per page
 *     responses:
 *       200:
 *         description: Successfully retrieved list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 */
router.get("/", authors_get);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     description: Retrieves a specific author by their ID.
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Author/properties/_id'
 *         description: The author ID
 *     responses:
 *       200:
 *         description: Successfully retrieved author details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 */
router.get("/:id", author_get);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Add a new author
 *     description: Creates a new author entry.
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewAuthor'
 *     responses:
 *       201:
 *         description: Author successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Validation error
 */
router.post("/", author_post);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     description: Updates an existing author entry.
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Author/properties/_id'
 *         description: The author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewAuthor'
 *     responses:
 *       200:
 *         description: Author successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Author not found
 */
router.put("/:id", author_put);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     description: Deletes an author by ID.
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Author/properties/_id'
 *         description: The author ID
 *     responses:
 *       200:
 *         description: Author successfully deleted
 *       404:
 *         description: Author not found
 */
router.delete("/:id", author_delete);

export default router;
