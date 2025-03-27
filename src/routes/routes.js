import Router from "express";
import { routerProducts } from "./products/productos.routes.js";
import { routerCategories } from "./categories/categorias.routes.js";

const router = Router();

router.use("/products", routerProducts);
router.use("/categories", routerCategories);

export { router };
