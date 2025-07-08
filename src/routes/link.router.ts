import { Router } from "express";
import { linkController } from "../controllers";

const linkRouter = Router();

linkRouter.post('/create-link', linkController.createLink);
linkRouter.get('/get-links', linkController.getLinks);
linkRouter.get('/get-link/:id', linkController.getLinkById);
linkRouter.put('/update-link/:id', linkController.updateLink);
linkRouter.delete('/delete-link/:id', linkController.deleteLink);

export default linkRouter;