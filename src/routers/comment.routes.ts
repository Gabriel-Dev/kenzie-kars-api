import { Router } from "express";
import { commentSchema } from "../schemas/comment.schema";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  createCommentController,
  deleteCommentController,
  updateCommentController,
} from "../controllers/comments.controller";
import { ensureauthMiddleware } from "../middlewares/ensureAuthExists.middleware";

const commentsRoutes = Router();

commentsRoutes.post(
  "/announcements/:adId/users/",
  ensureDataIsValidMiddleware(commentSchema),
  ensureauthMiddleware,
  createCommentController
);

commentsRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(commentSchema),
  updateCommentController
);

commentsRoutes.delete("/:id", deleteCommentController);

export { commentsRoutes };
