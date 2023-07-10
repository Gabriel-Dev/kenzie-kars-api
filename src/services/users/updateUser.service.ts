import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { iUserReturn, iUserUpdate } from "../../interfaces/user.interface";
import { createUserSchema } from "../../schemas/user.schema";

const updateUserService = async (
  userId: string,
  body: iUserUpdate
): Promise<iUserReturn> => {
  const userRepository = AppDataSource.getRepository(User);

  return await userRepository
    .findOneByOrFail({ id: userId })
    .then(async (res) => {
      const data = { ...res, ...body };

      await userRepository.update({ id: userId }, data);

      return createUserSchema.parse(data);
    })
    .catch((err) => {
      throw new AppError("User not exists!", 404);
    });
};

export { updateUserService };
