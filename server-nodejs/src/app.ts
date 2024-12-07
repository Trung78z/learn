import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "./configs/db";
import RootRouter from "./routes";

const app = express();
app.use(cors({ origin: ["http://localhost:4173", "http://localhost:5173"] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to api framework express" });
});

app.use("/api", RootRouter);

export default app;
