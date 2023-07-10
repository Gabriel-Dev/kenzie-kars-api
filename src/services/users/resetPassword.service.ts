import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { hashSync } from "bcryptjs";

const resetPasswordService = async (
  password: string,
  resetToken: string
): Promise<any> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      reset_token: resetToken,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const data = { password: hashSync(password, 10), reset_token: null };

  await userRepository.update({ id: user.id }, data);
};

export { resetPasswordService };
