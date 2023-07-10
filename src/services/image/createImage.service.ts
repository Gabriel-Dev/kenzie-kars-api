import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Image } from "../../entities/image.entity";
import { createImageSchema } from "../../schemas/image.schema";
import { Announcement } from "../../entities/announcement.entity";

const createImageService = async (announcementId: string, data: any) => {
  const imageRepository: Repository<Image> = AppDataSource.getRepository(Image);
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const ad = await announcementRepository.findOneByOrFail({
    id: announcementId,
  });

  const image = imageRepository.create({
    link: data.link,
    announcement: ad,
  });

  await imageRepository.save(image);

  return createImageSchema.parse(image);
};

export { createImageService };
