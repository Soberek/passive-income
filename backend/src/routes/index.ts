import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});

router.get("/ping", (_: Request, res: Response) => {
  res.json({ message: "pong" });
});

export default router;
