import { Router } from "express";
import {
  getOrderTimeProduct,
  getProducto,
  getProductos,
  guardarProducto,
} from "../../controllers/products/productos.controller.js";

const routerProducts = Router();

routerProducts.get("/", getProductos);
routerProducts.get("/order/", getOrderTimeProduct);
routerProducts.get("/:id", getProducto);
routerProducts.post("/", guardarProducto);

export { routerProducts };
