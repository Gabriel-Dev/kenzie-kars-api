import { FindOptionsWhere, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/comment.entity";

const deleteCommentService = async (commentId: string): Promise<void> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const comment = await commentRepository.findOne({
    where: {
      id: commentId,
    } as FindOptionsWhere<Comment>,
  });

  await commentRepository.remove(comment!);
};

export { deleteCommentService };
