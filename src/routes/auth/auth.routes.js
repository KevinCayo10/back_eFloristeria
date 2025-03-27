import { Router } from "express";
import UsuarioController from "../../controllers/usuarios.controller";
const usuariosController = new UsuarioController();
const route = Router();

route.post("/auth/register", usuariosController.register);
route.post("/auth/login", usuariosController.login);
route.get("/", usuariosController.getUsers);

export default route;
