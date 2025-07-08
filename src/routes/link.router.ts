import { Router } from "express";
import { linkController } from "../controllers";

const linkRouter = Router();

linkRouter.post('/link', linkController.createLink);
linkRouter.get('/links', linkController.getLinks);
linkRouter.get('/link/:id', linkController.getLinkById);
linkRouter.put('/link/:id', linkController.updateLink);
linkRouter.delete('/link/:id', linkController.deleteLink);

export default linkRouter;