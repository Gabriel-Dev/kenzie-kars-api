import z from "zod";
import {
  commentSchema,
  createCommentSchema,
  updateCommentSchema,
  updateCommentSchemaReturn,
} from "../schemas/comment.schema";

type iComment = z.infer<typeof commentSchema>;
type iCommentReturn = z.infer<typeof createCommentSchema>;
type iCommentUpdate = z.infer<typeof updateCommentSchema>;
type iCommentUpdateReturn = z.infer<typeof updateCommentSchemaReturn>;

export { iComment, iCommentReturn, iCommentUpdate, iCommentUpdateReturn };
