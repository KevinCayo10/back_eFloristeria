"use strict";
import { loginSvc } from "../../services/auth/auth.services.js";
import MyError from "../../utils/error.js";

const login = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;
    const { token, user } = await loginSvc(email, contrasenia);
    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60, // 1 hora
      })
      .json({
        status: 200,
        message: "Login exitoso",
        data: {
          token: token,
          user: user,
        },
      });
  } catch (error) {
    throw new MyError("Acceso denegado: " + error, 401);
  }
};

export { login };
