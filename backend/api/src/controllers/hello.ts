import { Request, Response } from "express";

export const say = () => async (req: Request, res: Response) => {
  res.json({ message: "Hello" })
};
