import { Router } from "express";
import * as autorController from "../controllers/autor.controller";

const router = Router();

router.get("/", autorController.getAll);
router.get("/:id", autorController.getById);

export default router;