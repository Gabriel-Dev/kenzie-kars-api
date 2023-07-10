import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  resetPasswordController,
  retrieveUserController,
  sendResetEmailPasswordController,
  updateUserController,
} from "../controllers/user.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { updateUserSchema, userSchema } from "../schemas/user.schema";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";

const usersRoutes = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  createUserController
);

usersRoutes.get("/:id", ensureUserExistsMiddleware, retrieveUserController);

usersRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateUserSchema),
  updateUserController
);

usersRoutes.delete("/:id", ensureUserExistsMiddleware, deleteUserController);

usersRoutes.post("/resetPassword", sendResetEmailPasswordController);

usersRoutes.patch("/resetPassword/:token", resetPasswordController);

export { usersRoutes };
