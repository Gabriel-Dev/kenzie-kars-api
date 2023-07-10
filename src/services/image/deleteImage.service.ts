import { AppDataSource } from "../../data-source";
import { Image } from "../../entities/image.entity";
import { AppError } from "../../errors/AppError";

const deleteImageService = async (id: string): Promise<object> => {
  const imageRepository = AppDataSource.getRepository(Image);

  return await imageRepository
    .delete({ id: id })
    .then((res) => {
      return {};
    })
    .catch((err) => {
      throw new AppError("Image not found", 404);
    });
};

export { deleteImageService };
