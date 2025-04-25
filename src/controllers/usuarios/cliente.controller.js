import { createClienteSvc, deleteClienteSvc, getClientesSvc, getClienteSvc, updateClienteSvc } from "../../services/usuarios/cliente.services";
import MyError from "../../utils/error";


export const getCliente = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await getClienteSvc({ id })
    return res.json({
      status: "ok",
      message: "Cliente obtenido exitosamente",
      data: response
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
};

export const getClientes = async (req, res, next) => {
  try {

    const response = await getClientesSvc()
    return res.json({
      status: "ok",
      message: "Clientes obtenido exitosamente",
      data: response
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
}

export const createCliente = async (req, res, next) => {
  try {
    const { ruc, nombre, apellido, direccion, ciudad, telefono, codigoTelf } = req.body
    const response = await createClienteSvc({ ruc, nombre, apellido, direccion, ciudad, telefono, codigoTelf })
    return res.json({
      status: "ok",
      message: "Clientes registrado exitosamente",
      data: response
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
}

export const updateCliente = async (req, res, next) => {
  try {
    const { id } = req.params
    const { ruc, nombre, apellido, direccion, ciudad, telefono, codigoTelf } = req.body
    const repsonse = await updateClienteSvc({
      id, ruc, nombre, apellido, direccion, ciudad, telefono, codigoTelf
    })
    return res.json({
      status: "ok",
      message: "Clientes registrado exitosamente",
      data: repsonse
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
}

export const deleteCliente = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await deleteClienteSvc({ id })
    return res.json({
      status: "ok",
      message: "Clientes registrado exitosamente",
      data: response
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
}