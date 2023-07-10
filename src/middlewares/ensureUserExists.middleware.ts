import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/AppError";
import { User } from "../entities/users.entity";

const ensureUserExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: request.params.id,
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default ensureUserExistsMiddleware;
