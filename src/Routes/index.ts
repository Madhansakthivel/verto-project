import { Router } from "express";
import Route from "./ProductRouter";

const router = Router();

router.use("/product", Route);


export default router;