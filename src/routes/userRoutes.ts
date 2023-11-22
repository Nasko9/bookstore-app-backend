import express, { Request, Response } from "express";
// import User from "../models/userModel";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  res.send(req.body);
});

export default router;
