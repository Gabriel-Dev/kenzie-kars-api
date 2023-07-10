import { Request, Response } from "express";
import { createImageService } from "../services/image/createImage.service";
import { updateImageService } from "../services/image/updateImage.service";
import { iImage } from "../interfaces/image.interface";
import { retrieveImageService } from "../services/image/retrieveImage.service";
import { deleteImageService } from "../services/image/deleteImage.service";

const createImageController = async (req: Request, res: Response) => {
  const announcementId = req.params.id;
  const data = req.body;
  console.log("aqui: ", req);

  const image = await createImageService(announcementId, data);

  return res.status(201).json(image);
};

const updateImageController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: iImage = req.body;

  const updatedImage = await updateImageService(id, data);

  res.status(200).json(updatedImage);
};

const retrieveImageController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const image = await retrieveImageService(id);

  res.status(200).json(image);
};

const deleteImageController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const deletedImage = await deleteImageService(id);

  res.status(204).json(deletedImage);
};

export {
  createImageController,
  updateImageController,
  retrieveImageController,
  deleteImageController,
};
