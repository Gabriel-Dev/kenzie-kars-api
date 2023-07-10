import { z } from "zod";
import { createUserSchema } from "./user.schema";

const commentSchema = z.object({
  description: z.string(),
});

const createCommentSchema = commentSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  user: createUserSchema
});

const updateCommentSchema = z.object({
  description: z.string().optional(),
});

const updateCommentSchemaReturn = updateCommentSchema.extend({
  id: z.string().optional(),
  createdAt: z.date().optional(),
});

export {
  commentSchema,
  createCommentSchema,
  updateCommentSchema,
  updateCommentSchemaReturn,
};
