import jwt from "jsonwebtoken";
import { Response, Request } from "express";

export const validateJWT = (req: Request, res: Response): boolean => {
  const token: string = req.headers["x-access-token"].toString();
  if (!token) {
    return false;
  } else if (token) {
    jwt.verify(token, "secretPassword", (err) => {
      if (err) {
        throw err;
      }
    });
  }
  return true;
};

export const generateJWT = (myToken: string) =>
  jwt.sign({ myToken }, "secretPassword");
