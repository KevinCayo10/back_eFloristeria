import { Router } from "express";
import { methods as categoriasController } from "./../controllers/categorias.controller";

const router = Router();

router.get("/", categoriasController.getCategorias);

export default router;
