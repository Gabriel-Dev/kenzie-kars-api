import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureauthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "invalid token",
    });
  }

  const splitToken = token.split(" ")[1];

  jwt.verify(
    splitToken,
    process.env.SECRET_KEY!,
    (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({
          message: "invalid token",
        });
      }

      req.user = {
        buyer: decoded.buyer,
        token: token,
      };

      res.locals = {
        email: decoded.email,
        id: decoded.sub,
        buyer: decoded.buyer,
        token: token,
      };
      return next();
    }
  );
};

export { ensureauthMiddleware };
