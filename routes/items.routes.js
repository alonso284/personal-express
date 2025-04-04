import { Router } from "express";
import { getHelloWorld, getItems, getItem, postItem, deleteItem, putItem } from "../controllers/items.controllers.js";
import { validateJWT } from "../utils/jwt.js";

const router = Router();

router.get("/items/", validateJWT, getItems);
router.get("/items/:id", validateJWT, getItem);
router.post("/items/", validateJWT, postItem);
router.delete("/items/:id", validateJWT, deleteItem);
router.put("/items/:id", validateJWT, putItem);

export default router;
