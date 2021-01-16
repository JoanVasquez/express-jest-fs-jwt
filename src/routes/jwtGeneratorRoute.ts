import express, { Request, Response, Router } from "express";
import { generateJWT } from "../utils/jwt";
import { onSuccess } from "../utils/response";

const router: Router = express.Router();

router.get("/jwt/:token", (req: Request, res: Response) => {
  const token: string = req.params.token;
  const generatedToken: string = generateJWT(token);
  res.status(200).send(onSuccess(generatedToken));
});

export default router;
