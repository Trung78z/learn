import express, { Request, Response } from "express";
import todoRoute from "./todoRoute";
const RootRouter = express();
RootRouter.get("/", (req: Request, res: Response) => {
  res.json({ exp: Math.floor(Date.now() / 1000) });
});

RootRouter.use("/todo", todoRoute);

export default RootRouter;
