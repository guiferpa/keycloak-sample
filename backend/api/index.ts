import express from "express";
import cors from "cors";
import morgan from "morgan";

import * as routes from "./src/routes";

const port = 3000;

const app = express();
const router = express.Router();

router.use(morgan("dev"));
router.use(express.json());
router.use(cors());

router.use("/hello", routes.hello);

app.use("/api", router);

app.listen(port, () => {
  console.log(`App's running at ${port}`);
});
