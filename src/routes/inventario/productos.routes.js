import { Router } from "express";
import {
  createProducto,
  deleteProducto,
  getProducto,
  getProductos,
  updateProducto,
} from "../../controllers/inventario/productos.controller.js";

const routerProducts = Router();

routerProducts.get("/getProductos", getProductos);
routerProducts.get("/getProducto/:id", getProducto);
routerProducts.post("/createProducto", createProducto);
routerProducts.put("/updateProducto", updateProducto);
routerProducts.delete("/deleteProducto/:id", deleteProducto);

export { routerProducts };
