import { Router } from "express";
import { getHelloWorld, getItems, getItem, postItem, deleteItem, putItem } from "../controllers/items.controllers.js";

const router = Router();

router.get("/items/", getItems);
router.get("/items/:id", getItem);
router.post("/items/", postItem);
router.delete("/items/:id", deleteItem);
router.put("/items/:id", putItem);

export default router;
