import { AppDataSource } from "../../data-source";
import { Image } from "../../entities/image.entity";
import { AppError } from "../../errors/AppError";
import { createImageSchema } from "../../schemas/image.schema";

const retrieveImageService = async (id: string) => {
  const imageRepository = AppDataSource.getRepository(Image);

  return await imageRepository
    .findOneByOrFail({ id: id })
    .then((res) => {
      return createImageSchema.parse(res);
    })
    .catch((err) => {
      throw new AppError("Image not found", 404);
    });
};

export { retrieveImageService };
