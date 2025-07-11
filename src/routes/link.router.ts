import { Router } from "express";
import { linkController } from "../controllers";

const linkRouter = Router();

/**
 * @swagger
 * /api/link/create-link:
 *   post:
 *     summary: Create a new link
 *     tags: [Link]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: My Link
 *               url:
 *                 type: string
 *                 example: https://example.com
 *               description:
 *                 type: string
 *                 example: A description of the link
 *     responses:
 *       201:
 *         description: Link created successfully
 */

linkRouter.post('/create-link', linkController.createLink);

/**
 * @swagger
 * /api/link/get-links:
 *   get:
 *     summary: Get all links
 *     tags: [Link]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Links fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Links fetched successfully
 *                 data:
 *                   type: array
 */
linkRouter.get('/get-links', linkController.getLinks);
linkRouter.get('/get-link/:id', linkController.getLinkById);
/**
 * @swagger
 * /api/link/update-link/{id}:
 *   put:
 *     summary: Update a link
 *     tags: [Link]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the link to update
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - url
 *              - description
 *            properties:
 *              title:
 *                type: string
 *                example: My Link
 *              url:
 *                type: string
 *                example: https://example.com
 *              description:
 *                type: string
 *                example: A description of the link
 *     responses:
 *       200:
 *         description: Link updated successfully
 */
linkRouter.put('/update-link/:id', linkController.updateLink);
linkRouter.delete('/delete-link/:id', linkController.deleteLink);
linkRouter.patch('/reorder-links', linkController.reorderLinks);

export default linkRouter;