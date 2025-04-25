import Router from "express";
import routerAuth from "./auth/auth.routes.js";
import { routerUsuario } from "./usuarios/usuarios.routes.js";
import { routerProducts } from "./inventario/productos.routes.js";
import { routerCategories } from "./inventario/categorias.routes.js";
import routerEmpresa from "./empresa/empresa.routes.js";
import routerCliente from "./usuarios/clientes.routes.js";

const router = Router();

router.use("/auth", routerAuth);
router.use("/products", routerProducts);
router.use("/categories", routerCategories);
router.use("/users", routerUsuario);
router.use("/customers", routerCliente);
router.use("/companies", routerEmpresa);
export { router };
