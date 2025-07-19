import { Router } from "express";
import { analyticsController, linkController } from "../controllers";

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

// Route to create a new link
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
// Route to get all links for the authenticated user
linkRouter.get('/get-links', linkController.getLinks);
// Route to get a single link by its ID
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
// Route to update a link by its ID
linkRouter.put('/update-link/:id', linkController.updateLink);
/**
 * @swagger
 * /api/link/delete-link/{id}:
 *   delete:
 *     summary: Delete a link
 *     tags: [Link]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the link to delete
 *     responses:
 *       200:
 *         description: Link deleted successfully
 */
// Route to delete a link by its ID
linkRouter.delete('/delete-link/:id', linkController.deleteLink);
/**
 * @swagger
 * /api/link/reorder-links:
 *   patch:
 *     summary: Reorder links
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
 *               - linkIds
 *             properties:
 *               linkIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["linkId1", "linkId2", "linkId3"]
 *     responses:
 *       200:
 *         description: Links reordered successfully
 */
// Route to reorder links for the authenticated user
linkRouter.patch('/reorder-links', linkController.reorderLinks);

linkRouter.get('/:id/analytics', analyticsController.getLinkAnalytics);

export default linkRouter;