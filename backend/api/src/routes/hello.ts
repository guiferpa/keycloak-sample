import express from "express";

const router = express.Router();

import { hello } from "../controllers";
import { auth } from "../middlewares";

router.get("/", auth.authorization(), hello.say());

export default router;
