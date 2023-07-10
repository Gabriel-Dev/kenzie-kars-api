import { z } from "zod";
import { createUserSchema } from "./user.schema";
import { createImageSchema } from "./image.schema";
import { createCommentSchema } from "./comment.schema";

const announcementSchema = z.object({
  brand: z.string(),
  model: z.string(),
  year: z.string(),
  fuel: z.number(),
  mileage: z.number(),
  color: z.string(),
  price_table_fipe: z.string(),
  price: z.string(),
  description: z.string(),
  published: z.boolean(),
  cover_image: z.string(),
});

const createAnnouncementSchema = announcementSchema.extend({
  id: z.string(),
  createdAt: z.string(),
});

const updateAnnouncementSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.string().optional(),
  fuel: z.number().optional(),
  mileage: z.number().optional(),
  color: z.string().optional(),
  price_table_fipe: z.string().optional(),
  price: z.string().optional(),
  description: z.string().optional(),
  published: z.boolean().optional(),
  cover_image: z.string().optional(),
});

const updateAnnouncementSchemaReturn = updateAnnouncementSchema.extend({
  id: z.string().optional(),
  createdAt: z.string().optional(),
});

const returnAnnouncementSchema = createAnnouncementSchema.extend({
  user: createUserSchema,
  image: createImageSchema.array(),
  comment: createCommentSchema.array(),
});

const returnAnnouncementSchemaAll = returnAnnouncementSchema.array();

export {
  announcementSchema,
  createAnnouncementSchema,
  updateAnnouncementSchema,
  updateAnnouncementSchemaReturn,
  returnAnnouncementSchemaAll,
  returnAnnouncementSchema,
};
