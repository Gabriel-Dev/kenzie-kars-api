import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/users.entity";

const RetrieveUserService = async (userId: string): Promise<any> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      announcement: { image: true },
      address: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

export { RetrieveUserService };
