import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { iAnnouncementUserReturn } from "../../interfaces/announcement.interface";
import { Announcement } from "../../entities/announcement.entity";
import { returnAnnouncementSchema } from "../../schemas/announcement.schema";

const RetrieveAnnouncementService = async (
  announcementId: string
): Promise<iAnnouncementUserReturn> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const announcement = await announcementRepository.findOne({
    where: {
      id: announcementId,
    },
    relations: {
      user: true,
      image: true,
      comment:{
        user:true
      }
    },
  });

  return returnAnnouncementSchema.parse(announcement);
};

export { RetrieveAnnouncementService };
