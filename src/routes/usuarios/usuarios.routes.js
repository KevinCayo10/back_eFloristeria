import { Router } from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
} from "../../controllers/usuarios/usuario.controller.js";
import { verifyBearerToken } from "../../middleware/auth.middleware.js";

const routerUsuario = Router();

routerUsuario.get("/get-users", verifyBearerToken, getUsers);
routerUsuario.get("/get-user/:id", verifyBearerToken, getUser)
routerUsuario.post("/register-user", createUser);
routerUsuario.put("/update-user", verifyBearerToken, updateUser);

export { routerUsuario };
