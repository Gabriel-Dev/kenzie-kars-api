import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { iLogin } from "../../interfaces/login.interface";
import { User } from "../../entities/users.entity";

const createLoginService = async ({
  email,
  password,
}: iLogin): Promise<string> => {
  const usersRepository = AppDataSource.getRepository(User);

  const user = await usersRepository.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 403);
  }

  const token = jwt.sign(
    { userName: user.name, buyer: user.buyer },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1h",
      subject: String(user.id),
    }
  );

  return token;
};

export { createLoginService };
