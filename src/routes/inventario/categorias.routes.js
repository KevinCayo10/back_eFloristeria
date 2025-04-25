import { Router } from "express";
import { createCategoria, deleteCategoria, getCategoria, getCategorias, updateCategoria } from "../../controllers/inventario/categorias.controller";


const routerCategories = Router();

routerCategories.get("/getCategoria", getCategorias);
routerCategories.get("/getCategoria/:id", getCategoria)
routerCategories.post("/createCategoria", createCategoria)
routerCategories.put("/updateCategoria", updateCategoria)
routerCategories.delete("/deleteCategoria", deleteCategoria)

export { routerCategories };
