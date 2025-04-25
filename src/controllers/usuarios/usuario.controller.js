import {
  createUserSvc,
  getUsersSvc,
  getUserSvc,
  updateUserSvc,
} from "../../services/usuarios/usuario.services.js";
import MyError from "../../utils/error.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await getUsersSvc();
    return res.status(200).json({
      status: 200,
      message: "Usuarios encontrados",
      data: {
        users: users,
      },
    });
  } catch (error) {
    next(new MyError(error.message, "Error al obtener usuarios", error.statusCode))
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserSvc(id);
    return res.status(200).json({
      status: 200,
      message: "Usuarios encontrados",
      data: {
        user: user,
      },
    });
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { nombre, email, contrasenia, rol } = req.body;
    // validar los no opcionales

    const user = await createUserSvc(
      {
        nombre,
        email,
        contrasenia,
        rol
      }
    );

    return res.json({
      status: 200,
      message: "Usuario creado",
      data: [],
    });
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, contrasenia, rol } = req.body;
    // validar los no opcionales
    const user = await updateUserSvc(
      id,
      nombre,
      apellido,
      email,
      telefono,
      contrasenia,
      rol
    );
    return res.json({
      status: 200,
      message: "Usuario actualizado",
      data: [],
    });
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
};
