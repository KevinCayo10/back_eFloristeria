import { Router } from "express";
import { methods as usuarioControllers } from "./../controllers/usuario.controller";

const router = Router();

router.get("/", usuarioControllers.getUsuarios);
router.get("/:id_usuario", usuarioControllers.getUsuario);
router.post("/", usuarioControllers.addUsuario);
router.put("/:id_usuario", usuarioControllers.updateUsuario);
router.delete("/:id_usuario", usuarioControllers.deleteUsuario);

export default router;
