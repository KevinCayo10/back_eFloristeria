import { Router } from "express";
import { getCategorias } from "../../controllers/categories/categorias.controller.js";

const routerCategories = Router();

routerCategories.get("/", getCategorias);

export { routerCategories };
