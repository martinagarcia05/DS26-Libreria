import { Router } from "express";
import * as libroController from "../controllers/libro.controller";

const router = Router();
// Las rutas van RELATIVAS: el prefijo /api/libros lo monta index.ts.
router.get("/", libroController.getAll);
router.get("/:id", libroController.getById);
router.post("/", libroController.create);

export default router;
