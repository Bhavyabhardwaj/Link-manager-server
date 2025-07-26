import { NotFoundError } from "../errors";
import { linkService } from "../services";
import { Response, Request, NextFunction } from "express";
import { slugUtil } from "../utils";
import { QRCodeGenerator } from '../utils/qrCode';

// Controller functions for handling link-related API requests

// Handles creation of a new link for the authenticated user
export const createLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, url, description, slug } = req.body;
    const userId = (req as any).user.id;
    
    const newLink = await linkService.createLink(
      { title, url, description, active: true, slug },
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

// Handles fetching all links for the authenticated user
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

// Handles fetching a single link by its ID for the authenticated user
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

// Handles updating a link by its ID for the authenticated user
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

// Handles soft-deleting a link by its ID for the authenticated user
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

// Handles reordering of links for the authenticated user
export const reorderLinks = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const { linkIds } = req.body;
        const reorderedLinks = await linkService.reorderLinks(userId, linkIds);
        res.status(200).json({
            status: "success",
            message: "Links reordered successfully",
            data: reorderedLinks,
        });
    } catch (error: any) {
        next(error);
    }
}

export const getQRCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { format = 'png', size = 200 } = req.query;
        
        const link = await linkService.getLinkById(id);
        if (!link) return res.status(404).json({ error: 'Link not found' });
        
        const shortUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/${link.slug}`;
        
        if (format === 'svg') {
            const svgQR = await QRCodeGenerator.generateQRCode(shortUrl, { 
                format: 'svg',
                size: Number(size)
            });
            res.setHeader('Content-Type', 'image/svg+xml');
            return res.send(svgQR);
        }
        
        // Return base64 image
        const qrCode = await QRCodeGenerator.generateQRCode(shortUrl, { 
            size: Number(size)
        });
        res.json({ qrCode, shortUrl });
        
    } catch (error) {
        next(error);
    }
};

export const regenerateQRCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const options = req.body;
        
        const updatedLink = await linkService.regenerateQRCode(id, options);
        res.json({ 
            message: 'QR code regenerated successfully',
            qrCode: updatedLink.qrCode 
        });
        
    } catch (error) {
        next(error);
    }
};