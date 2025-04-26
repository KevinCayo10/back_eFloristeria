import MyError from "../../utils/error.js";
import prisma from "../../config/prisma.js"
export const getClientesSvc = async () => {

  try {
    const dataClient = await prisma.clientes.findMany()
    const clientes = dataClient.map(data => ({
      id: data.id_cli,
      ruc: data.ced_cli,
      nombre: data.nom_cli,
      apellido: data.ape_cli,
      direccion: data.dir_cli,
      ciudad: data.ciu_cli,
      telefono: data.telf_cli,
      codigoTelf: data.telf_code_cli

    }))

    return clientes;
  } catch (error) {
    throw new MyError(error.message, error.status);
  }
}

export const getClienteSvc = async ({ id }) => {

  try {
    const dataClient = await prisma.clientes.findUnique({
      where: {
        id_cli: parseInt(id)
      }
    })

    if (!dataClient) {
      throw new MyError('El producto no existe', 400)
    }

    const cliente = {
      id: dataClient.id_cli,
      ruc: dataClient.ced_cli,
      nombre: dataClient.nom_cli,
      apellido: dataClient.ape_cli,
      direccion: dataClient.dir_cli,
      ciudad: dataClient.ciu_cli,
      telefono: dataClient.telf_cli,
      codigoTelf: dataClient.telf_code_cli
    }

    return cliente
  } catch (error) {
    throw new MyError(error.message, error.status);
  }
}

export const createClienteSvc = async ({
  ruc, nombre, apellido, direccion, ciudad, telefono, codigoTelf
}) => {

  try {
    const existByRuc = await prisma.clientes.findUnique({
      where: {
        ced_cli: ruc
      }
    })
    if (!existByRuc) {
      throw new MyError('El RUC/CI del cliente ya existe', 400)
    }

    const response = await prisma.clientes.create({
      data: {
        ced_cli: ruc,
        nom_cli: nombre,
        ape_cli: apellido,
        dir_cli: direccion,
        ciu_cli: ciudad,
        telf_code_cli: codigoTelf,
        telf_cli: telefono
      }
    })
    return response
  } catch (error) {
    throw new MyError(error.message, error.status);
  }
}

export const updateClienteSvc = async ({
  id, ruc, nombre, apellido, direccion, ciudad, telefono, codigoTelf
}) => {

  try {

    const dataCliente = await prisma.clientes.findUnique({
      where: {
        id_cli: parseInt(id)
      }
    })
    if (!dataCliente) {
      throw new MyError('El cliente no existe', 400)

    }
    const response = await prisma.clientes.update({
      where: {
        id_cli: id
      },
      data: {
        ced_cli: ruc,
        nom_cli: nombre,
        ape_cli: apellido,
        dir_cli: direccion,
        ciu_cli: ciudad,
        telf_code_cli: codigoTelf,
        telf_cli: telefono
      }
    })
    return response

  } catch (error) {
    throw new MyError(error.message, error.status);
  }
}

export const deleteClienteSvc = async ({ id }) => {
  try {
    const dataCliente = await prisma.clientes.findUnique({
      where: {
        id_cli: parseInt(id)
      }
    })
    if (!dataCliente) {
      throw new MyError('El cliente no existe', 400)
    }

    const response = await prisma.clientes.delete({
      where: {
        id_cli: id
      }
    })
    return response
  } catch (error) {
    throw new MyError(error.message, error.status);
  }
}