import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcement.entity";

const deleteAnnouncementService = async (
  announcementId: string
): Promise<void> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  return await announcementRepository
    .findOneByOrFail({
      id: announcementId,
    })
    .then(async (res) => {
      await announcementRepository.delete(res.id);
      return;
    });
};

export { deleteAnnouncementService };
