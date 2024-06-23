import { Router } from "express";
import { methods as productosControllers } from "./../controllers/productos.controller";

const router = Router();

router.get("/", productosControllers.getProductos);
router.get("/order/", productosControllers.getOrderTimeProduct);
router.get("/:id", productosControllers.getProducto);
router.post("/", productosControllers.guardarProducto);

export default router;
