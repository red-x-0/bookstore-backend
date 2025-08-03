import { Router } from "express";
const router = Router();
import { main_index_get } from "../controllers/mainController";

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get main route
 *     description: Retrieves the main route of the API.
 *     tags: [Main]
 *     responses:
 *       200:
 *         description: Success response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to the API!"
 */
router.get("/", main_index_get);

export default router;
