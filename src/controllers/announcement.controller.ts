import { Request, Response } from "express";
import { createAnnouncementService } from "../services/announcement/createAnnouncement.service";
import { updateAnnouncementService } from "../services/announcement/updateAnnouncement.service";
import {
  iAnnouncementRetriveReturn,
  iAnnouncementUpdate,
} from "../interfaces/announcement.interface";
import { listAnnouncementService } from "../services/announcement/listAnnouncement.service";
import { deleteAnnouncementService } from "../services/announcement/deleteAnnouncement.service";
import { RetrieveAnnouncementService } from "../services/announcement/retrieveAnnouncement.service";

const createAnnouncementController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = req.body;

  const announcementId = res.locals.id;

  const announcements = await createAnnouncementService(data, announcementId);

  return res.status(201).json(announcements);
};

const updateAnnouncementController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const announcementData: iAnnouncementUpdate = req.body;
  const announcementId: string = req.params.id;

  const newData = await updateAnnouncementService(
    announcementData,
    announcementId
  );

  return res.status(200).json(newData);
};

const listAnnouncementController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const getAnnouncement: iAnnouncementRetriveReturn =
    await listAnnouncementService();

  return res.status(200).json(getAnnouncement);
};

const retrieveAnnouncementController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const announcementId: string = req.params.id;

  const getAnnouncement =
    await RetrieveAnnouncementService(announcementId);

  return res.status(200).json(getAnnouncement);
};

const deleteAnnouncementController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const announcementId: string = req.params.id;

  await deleteAnnouncementService(announcementId);

  res.status(204).send();
};

export {
  createAnnouncementController,
  updateAnnouncementController,
  listAnnouncementController,
  retrieveAnnouncementController,
  deleteAnnouncementController,
};
