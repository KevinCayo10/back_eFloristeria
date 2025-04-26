import { verify } from "../../utils/auth/bcrypt.js";
import { generateToken } from "../../utils/auth/jwt.js";
import { PrismaClient } from "@prisma/client";
import MyError from "../../utils/error.js";
import prisma from "../../config/prisma.js";
export const loginSvc = async (email, contrasenia) => {
  try {
    const dataUser = await prisma.usuarios.findUnique({
      where: {
        email_usu: email,
      },
    });


    if (!dataUser) {
      throw new MyError("Usuario no encontrado", 404);
    }
    const isPasswordValid = await verify(contrasenia, dataUser.pass_usu);

    if (!isPasswordValid) {
      throw new MyError("Contraseña incorrecta", 401);
    }
    const token = generateToken(dataUser);
    const user = {
      nombre: dataUser.nom_usu,
      email: dataUser.email_usu,
      rol: dataUser.rol_usu,
    }
    return { token, user };
  } catch (error) {
    throw new MyError(error.message, error.status);
  }
};
