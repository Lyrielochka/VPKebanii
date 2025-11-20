import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { SECRET_KEY } from "../utils/constants";
import { TestConnection } from "../data-access/test.connection";
import { User } from "../entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      authUser?: { idUser: number; email: string; role: string };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).send("Authorization header missing");

    const token = header.split(" ")[1];
    const payload: any = jwt.verify(token, SECRET_KEY);

    const userRepo = TestConnection.getRepository(User);
    const user = await userRepo.findOne({ where: { idUser: payload.idUser } });
    if (!user) return res.status(401).send("User not found");

    req.authUser = { idUser: user.idUser, email: user.email, role: user.role };
    next();
  } catch (err) {
    res.status(403).send("Forbidden");
  }
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.authUser?.role === "admin") {
    return next();
  }
  console.warn("Admin access denied for user", req.authUser);
  return res.status(403).send("Admin role required");
};
