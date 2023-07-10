import { Repository } from "typeorm";
import {
  iAnnouncement,
  iAnnouncementReturn,
} from "../../interfaces/announcement.interface";
import { Announcement } from "../../entities/announcement.entity";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { createAnnouncementSchema } from "../../schemas/announcement.schema";

const createAnnouncementService = async (
  data: iAnnouncement,
  userId: string
): Promise<iAnnouncementReturn> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const announcement: Announcement = announcementRepository.create({
    ...data,
    user,
  });

  await announcementRepository.save(announcement);

  return createAnnouncementSchema.parse(announcement);
};

export { createAnnouncementService };
