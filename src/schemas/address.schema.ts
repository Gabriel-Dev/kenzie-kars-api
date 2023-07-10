import { z } from "zod";
import { createUserSchema } from "./user.schema";

const addressRequestSchema = z.object({
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string(),
});

const addressResponseSchema = addressRequestSchema.merge( z.object({
  id: z.string(),
  user: createUserSchema.transform(({ id, name, email, ...data })=> { 
    return { id: id, name: name, email: email }
  })
}))

const addressUpdateSchema = addressRequestSchema.partial()

export {
  addressRequestSchema,
  addressResponseSchema,
  addressUpdateSchema
}
