import { Router } from "express";
import Route from "./Router";

const router = Router();

router.use("/", Route);


export default router;