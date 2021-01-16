import express, { Request, Response, Router } from "express";
import Acronym from "../models/Acronym";
import Error from "../models/Error";
import UserService from "../services/AcronymService";
import { validateJWT } from "../utils/jwt";
import { onSuccess } from "../utils/response";

const router: Router = express.Router();
const userService: UserService = new UserService();

router.get("/acronym", async (req: Request, res: Response) => {
  try {
    const from: number = parseInt(req.query.from.toString());
    const limit: number = parseInt(req.query.limit.toString());
    const search: string = req.query.search.toString();

    const acronyms: Array<Acronym> = await userService.filterAcronyms(
      from,
      limit,
      search
    );
    const totalAcronyms: number = await userService.totalAcronyms();

    res.status(200).send(
      onSuccess({
        acronyms,
        totalAcronyms,
      })
    );
  } catch (ex) {
    sendError(ex, res);
  }
});

router.get("/acronym/:acronym", async (req: Request, res: Response) => {
  try {
    const search: string = req.params.acronym;
    const acronym: Acronym = await userService.findByAcronym(search);
    res.status(200).send(onSuccess(acronym || { name: "", value: "" }));
  } catch (ex) {
    sendError(ex, res);
  }
});

router.post("/acronym", async (req: Request, res: Response) => {
  try {
    const acronym: Acronym = req.body;
    const isSaved: boolean = await userService.saveAcronym(acronym);
    res.status(201).send(onSuccess({ isSaved }));
  } catch (ex) {
    sendError(ex, res);
  }
});

router.get("/random/:count", async (req: Request, res: Response) => {
  try {
    const count: number = parseInt(req.params.count);
    const acronyms: Array<Acronym> = await userService.randomAcronym(count);
    res.status(200).send(onSuccess(acronyms));
  } catch (ex) {
    sendError(ex, res);
  }
});

router.put("/acronym/:acronym", async (req: Request, res: Response) => {
  try {
    const name: string = req.params.acronym;
    const value: string = req.body.value;
    const isValidToken: boolean = validateJWT(req, res);
    if (!isValidToken) {
      res.status(500).send("Invalid token");
    } else {
      const isUpdated: boolean = await userService.updateAcronym({
        name,
        value,
      });
      res.status(201).send({ isUpdated });
    }
  } catch (ex) {
    sendError(ex, res);
  }
});

router.delete("/acronym/:acronym", async (req: Request, res: Response) => {
  try {
    const name: string = req.params.acronym;
    const isValidToken: boolean = validateJWT(req, res);
    if (!isValidToken) {
      res.status(500).send("Invalid token");
    } else {
      const isRemoved: boolean = await userService.removeAcronym(name);
      res.status(410).send({ isRemoved });
    }
  } catch (ex) {
    sendError(ex, res);
  }
});

const sendError = (ex: any, res: Response) => {
  const error: Error = {
    message: ex.message,
    status: 500,
  };
  res.status(error.status).send(error);
};

export default router;
