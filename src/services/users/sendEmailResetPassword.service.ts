import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { randomUUID } from "node:crypto";
import { emailService } from "../../utils/sendEmail.utils";

const sendEmailResetPasswordService = async (email: string): Promise<any> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const token = randomUUID();
  const resetToken = token;

  const data = { reset_token: resetToken };

  await userRepository.update({ email: email }, data);

  const resetPasswordTemplate = emailService.resetPasswordTemplate(
    user.name,
    email,
    resetToken
  );

  await emailService.sendEmail(resetPasswordTemplate);
};

export { sendEmailResetPasswordService };
