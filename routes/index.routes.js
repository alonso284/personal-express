import { Router } from "express";
import { getHelloWorld } from "../controllers/index.controllers.js";

const router = Router();

router.get("/", getHelloWorld);

export default router;
