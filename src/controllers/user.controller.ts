import { Request, Response } from "express";
import createUserService from "../services/users/createUser.service";
import { iUser, iUserUpdate } from "../interfaces/user.interface";
import { RetrieveUserService } from "../services/users/retrieveUser.service";
import { updateUserService } from "../services/users/updateUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { sendEmailResetPasswordService } from "../services/users/sendEmailResetPassword.service";
import { resetPasswordService } from "../services/users/resetPassword.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: iUser = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const retrieveUserController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const userId: string = req.params.id;

  const getUser = await RetrieveUserService(userId);

  return res.status(200).json(getUser);
};

const updateUserController = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const body: iUserUpdate = req.body;

  const updatedUser = await updateUserService(userId, body);

  return res.status(200).json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const userId: string = req.params.id;

  const deletedUser = await deleteUserService(userId);

  return res.status(204).json(deletedUser);
};

const sendResetEmailPasswordController = async (
  req: Request,
  res: Response
) => {
  const email = req.body;

  await sendEmailResetPasswordService(email.email);
  return res.json({ message: "token send" });
};

const resetPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.params;

  await resetPasswordService(password, token);
  return res.json({
    message: "Password change with sucess",
  });
};

export {
  createUserController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
  sendResetEmailPasswordController,
  resetPasswordController,
};
