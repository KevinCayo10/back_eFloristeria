import MyError from "../../utils/error.js";
import { hashed } from "../../utils/auth/bcrypt.js";
import prisma from "../../config/prisma.js"


const getUsersSvc = async () => {
  try {
    const res = await prisma.usuarios.findMany();
    const users = res.map((user) => ({
      id: user.id,
      nombre: user.nom_usu,
      email: user.email_usu,
      rol: user.rol_usu,
    }));
    return users;
  } catch (error) {
    throw new MyError(error.message, error.status);
  }
};
const getUserSvc = async (id) => {
  try {
    const dataUser = await prisma.usuarios.findUnique({
      where: {
        id_usu: parseInt(id),
      },
      select: {
        nom_usu: true,
        email_usu: true,
        rol_usu: true
      }
    });

    const user = {
      nombre: dataUser.nom_usu,
      email: dataUser.email_usu,
      rol: dataUser.rol_usu,
    }


    return user;
  } catch (error) {
    throw new MyError(error.message, 500);
  }
};

const createUserSvc = async (
  { nombre,
    email,
    contrasenia,
    rol }
) => {
  try {
    const existEmail = await prisma.usuarios.findFirst({
      where: {
        email_usu: email
      }
    })
    console.log(existEmail)
    if (existEmail) {
      throw new MyError("Este email ya esta registrado", 400);

    }
    const passEncrypt = await hashed(contrasenia);
    const user = await prisma.usuarios.create({
      data: {
        nom_usu: nombre,
        email_usu: email,
        pass_usu: passEncrypt,
        rol_usu: rol,
      },
    });
    return user;
  } catch (error) {
    throw new MyError(error.message, 500);
  }
};

const updateUserSvc = async (
  id,
  nombre,
  email,
  contrasenia,
  rol
) => {
  try {
    const userOld = await prisma.usuarios.findUnique({
      where: {
        id_usu: id,
      },
    });
    if (!userOld) {
      throw new MyError("Usuario no encontrado", 404);
    }


    const passwordEncrypt = contrasenia
      ? await hashed(contrasenia)
      : userOld.pass_usu;

    const user = await prisma.usuarios.update({
      where: {
        id_usu: id,
      },
      data: {
        nom_usu: nombre || userOld.nom_usu,
        email_usu: email || userOld.email_usu,
        rol_usu: rol || userOld.rol_usu,
        pass_usu: passwordEncrypt,
      },
    });
    return user;
  } catch (error) {
    throw new MyError(error.message, "Error al actualizar el usuario", error.statusCode);
  }
};


export { getUsersSvc, getUserSvc, createUserSvc, updateUserSvc };
