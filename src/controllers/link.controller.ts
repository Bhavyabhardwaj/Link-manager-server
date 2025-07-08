import { NotFoundError } from "../errors";
import { linkService } from "../services";
import { Response, Request, NextFunction } from "express";

export const createLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, url, description } = req.body;
    const userId = (req as any).user.decoded.id;
    const newLink = await linkService.createLink(
      { title, url, description, active: true },
      userId
    );

    res.status(201).json({
      status: "success",
      message: "Link created successfully",
      data: newLink,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getLinks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const links = await linkService.getLinks(userId);
    res.status(200).json({
      status: "success",
      message: "Links fetched successfully",
      data: links,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getLinkById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const linkId = req.params.id;
    const userId = (req as any).user.id;
    const link = await linkService.getLinkById(linkId, userId);
    if (!link) {
      throw new NotFoundError("Link not found");
    } else {
      res.status(200).json({
        status: "success",
        message: "Link fetched successfully",
        data: link,
      });
    }
  } catch (error: any) {
    next(error);
  }
};

export const updateLink = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const linkId = req.params.id;
        const userId = (req as any).user.id;
        const updateData = req.body;
        const updatedLink = await linkService.updateLink(linkId, userId, updateData);
        res.status(200).json({
            status: "success",
            message: "Link updated successfully",
            data: updatedLink,
        });
    } catch (error: any) {
        next(error);
    }
}

export const deleteLink = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const linkId = req.params.id;
        const userId = (req as any).user.id;
        const deletedLink = await linkService.deleteLink(linkId, userId);
        res.status(200).json({
            status: "success",
            message: "Link deleted successfully",
            data: deletedLink,
        });
    } catch (error: any) {
        next(error);
    }
}