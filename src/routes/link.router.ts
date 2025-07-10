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

linkRouter.get('/get-links', linkController.getLinks);
linkRouter.get('/get-link/:id', linkController.getLinkById);
linkRouter.put('/update-link/:id', linkController.updateLink);
linkRouter.delete('/delete-link/:id', linkController.deleteLink);

export default linkRouter;