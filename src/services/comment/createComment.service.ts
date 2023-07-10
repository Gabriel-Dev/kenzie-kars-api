import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcement.entity";
import { User } from "../../entities/users.entity";
import { createCommentSchema } from "../../schemas/comment.schema";
import { Comment } from "../../entities/comment.entity";
import { AppError } from "../../errors/AppError";

const createCommentService = async (
  commentData: string,
  adId: string,
  userId: string
): Promise<any> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);
  const adRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const ad = await adRepository.findOneByOrFail({
    id: adId,
  });

  if (!ad) {
    throw new AppError("ad not found", 404);
  }

  const user = await userRepository.findOneByOrFail({
    id: userId,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const comment = commentRepository.create({
    description: commentData,
    announcement: ad,
    user: user,
  });

  await commentRepository.save(comment);

  return createCommentSchema.parse(comment);
};

export { createCommentService };
