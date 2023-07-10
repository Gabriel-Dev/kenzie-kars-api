import { z } from "zod";
import { returnAnnouncementSchemaAll } from "./announcement.schema";

const userSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  email: z.string(),
  password: z.string(),
  telephone: z.string(),
  date_of_birth: z.string(),
  description: z.string(),
  buyer: z.boolean(),
  // reset_password: z.string().nullable().optional(),
});

const createUserSchema = userSchema
  .extend({
    id: z.string(),
    createdAt: z.string(),
  })
  .omit({
    password: true,
  });

const updateUserSchema = userSchema.omit({ buyer: true }).partial();
const UserAnnouncementsSchema = createUserSchema.extend({
  announcement: returnAnnouncementSchemaAll,
});

export {
  userSchema,
  createUserSchema,
  UserAnnouncementsSchema,
  updateUserSchema,
};
