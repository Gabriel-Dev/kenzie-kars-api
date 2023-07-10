import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const handleErrors = (
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  console.log(error);

  return error instanceof AppError
    ? response.status(error.statusCode).json({
        message: error.message,
      })
    : error instanceof ZodError
    ? response.status(400).json({
        message: error.flatten().fieldErrors,
      })
    : response.status(500).json({
        message: error.message,
      });
};

export { AppError, handleErrors };
