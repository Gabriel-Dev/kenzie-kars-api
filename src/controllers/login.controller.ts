import { Request, Response } from "express";
import { createLoginService } from "../services/login/login.service";

const createLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await createLoginService({ email, password });

  return res.json({ token });
};

export { createLoginController };
