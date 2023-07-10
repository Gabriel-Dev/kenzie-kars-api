import { AppDataSource } from "../../data-source";
import { Image } from "../../entities/image.entity";
import { AppError } from "../../errors/AppError";
import { iImage, iImageResponse } from "../../interfaces/image.interface";
import { createImageSchema } from "../../schemas/image.schema";

const updateImageService = async (
  id: string,
  body: iImage
): Promise<iImageResponse> => {
  const imageRepository = AppDataSource.getRepository(Image);

  return await imageRepository
    .findOneByOrFail({ id: id })
    .then(async (res) => {
      const data = { ...res, ...body };

      await imageRepository.update({ id: id }, data);

      return createImageSchema.parse(data);
    })
    .catch((err) => {
      throw new AppError("Image not found", 404);
    });
};

export { updateImageService };
