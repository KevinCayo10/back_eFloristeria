import { Router } from "express";
import AuthController from "../controllers/auth.controller";
const authController = new AuthController();
const route = Router();

route.post("/register", authController.register);
route.post("/login", authController.login);

export default route;
