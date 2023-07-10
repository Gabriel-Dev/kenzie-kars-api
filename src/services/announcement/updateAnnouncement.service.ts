import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcement.entity";
import { iAnnouncementUpdate } from "../../interfaces/announcement.interface";
import { createAnnouncementSchema } from "../../schemas/announcement.schema";
import { iAnnouncementReturn } from "../../interfaces/announcement.interface";

const updateAnnouncementService = async (
  announcementData: iAnnouncementUpdate,
  announcementId: string
): Promise<iAnnouncementReturn> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const oldData: any = await announcementRepository.findOneBy({
    id: announcementId,
  });

  const announcement = announcementRepository.create({
    ...oldData,
    ...announcementData,
  });

  await announcementRepository.save(announcement);

  const newAnnouncement: iAnnouncementReturn =
    createAnnouncementSchema.parse(announcement);

  return newAnnouncement;
};

export { updateAnnouncementService };
