import { Router } from "express";
import { verifyBearerToken } from "../../middleware/auth.middleware";
import { createCliente, deleteCliente, getCliente, getClientes, updateCliente } from "../../controllers/usuarios/cliente.controller";

const routerCliente = Router()

routerCliente.get("/getClientes", verifyBearerToken, getClientes)
routerCliente.get("/getCliente/:id", verifyBearerToken, getCliente)
routerCliente.post("/createCliente", verifyBearerToken, createCliente)
routerCliente.put("/updateCliente", verifyBearerToken, updateCliente)
routerCliente.delete("/deleteCliente/:id", verifyBearerToken, deleteCliente)

export default routerCliente