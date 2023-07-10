import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const ensureIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user);
  const authenticatedUser = req.user.buyer;

  if (authenticatedUser) {
    throw new AppError("User dont have permission", 403);
  }

  return next();
};

export default ensureIsAdminMiddleware;
