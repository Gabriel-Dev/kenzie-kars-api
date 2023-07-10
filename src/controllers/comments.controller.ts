import { Request, Response } from "express";
import { createCommentService } from "../services/comment/createComment.service";
import { updateCommentService } from "../services/comment/updateComment.service";
import { deleteCommentService } from "../services/comment/deleteComment.service";

const createCommentController = async (req: Request, res: Response) => {
  const commentData = req.body.description;
  const adId = req.params.adId;
  const userId = res.locals.id;

  const comment = await createCommentService(commentData, adId, userId);

  return res.status(201).json(comment);
};

const updateCommentController = async (req: Request, res: Response) => {
  const commentData = req.body;
  const commentId = req.params.id;

  const comment = await updateCommentService(commentData, commentId);

  res.status(200).json(comment);
};

const deleteCommentController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const commentId: string = req.params.id;

  await deleteCommentService(commentId);

  res.status(204).send();
};

export {
  createCommentController,
  updateCommentController,
  deleteCommentController,
};
