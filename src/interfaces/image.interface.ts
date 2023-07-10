import z from "zod";
import { createImageSchema, imageSchema } from "../schemas/image.schema";

type iImage = z.infer<typeof imageSchema>;
type iImageResponse = z.infer<typeof createImageSchema>

export { iImage, iImageResponse };
