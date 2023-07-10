import { FindOptionsWhere, Repository } from "typeorm";
import {
  iComment,
  iCommentUpdateReturn,
} from "../../interfaces/comment.interface";
import { AppDataSource } from "../../data-source";
import { updateCommentSchemaReturn } from "../../schemas/comment.schema";
import { Comment } from "../../entities/comment.entity";

const updateCommentService = async (
  commentData: iComment,
  commentId: string
): Promise<iCommentUpdateReturn> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const oldData = await commentRepository.findOne({
    where: {
      id: commentId,
    } as FindOptionsWhere<Comment>,
  });

  const comment = commentRepository.create({
    ...oldData,
    ...commentData,
  });

  await commentRepository.save(comment);

  const newComment = updateCommentSchemaReturn.parse(comment);

  return newComment;
};

export { updateCommentService };
