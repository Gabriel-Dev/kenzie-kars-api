import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Announcement } from "../entities/announcement.entity";
import { AppError } from "../errors/AppError";

const ensureAnnouncementExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const findAnnouncement = await announcementRepository.findOneBy({
    id: request.params.id,
  });

  if (!findAnnouncement) {
    throw new AppError("Announcement not found", 404);
  }

  return next();
};

export default ensureAnnouncementExistsMiddleware;
