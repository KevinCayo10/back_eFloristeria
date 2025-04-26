import { PrismaClient } from "@prisma/client";
import MyError from "../../utils/error";
import prisma from "../../config/prisma.js"
export const getProductosSvc = async () => {
  try {
    const dataProductos = await prisma.productos.findMany({
      include: {
        categorias: true,
        impuesto: true
      }
    })
    const productos = dataProductos.map((prod) => ({
      id: prod.id_pro,
      producto: prod.desc_pro,
      precio: prod.precio_pro,
      impuesto: prod.impuesto.porcentaje_imp,
      imagen: prod.img_pro
    }))
    return productos
  } catch (error) {
    throw new MyError(error.message, error.status);
  }
}

export const getProductoSvc = async ({ id }) => {

  try {
    const dataProductos = await prisma.productos.findUnique({
      where: {
        id_pro: parseInt(id)
      },
      include: {
        categorias: true,
        impuesto: true
      }
    })

    if (!dataProductos) {
      throw new MyError('El producto no existe', 400)
    }

    const producto = {
      id: dataProductos.id_pro,
      producto: dataProductos.desc_pro,
      precio: dataProductos.precio_pro,
      impuesto: dataProductos.impuesto.porcentaje_imp,
      imagen: dataProductos.img_pro
    }

    return producto
  } catch (error) {
    throw new MyError(error.message, error.status);
  }
}

export const createProductoSvc = async ({
  nombre,
  precio1,
  precio2,
  precio3,
  imagen,
  id_categoria,
  id_impuesto,
}) => {

  try {
    const existProducto = await prisma.productos.findFirst({
      where: {
        desc_pro: nombre
      }
    })

    if (existProducto) {
      throw new MyError('El producto ya existe', 400)
    }

    const dataProducto = await prisma.productos.create({
      data: {
        desc_pro: nombre,
        precio_pro: precio1,
        precio2_pro: precio2,
        precio3_pro: precio3,
        img_pro: imagen,
        fecha_pro: new Date(),
        categorias: {
          connect: {
            id_cate: id_categoria
          }
        },
        impuesto: {
          connect: {
            id_imp: id_impuesto
          }
        },
      }
    })
    const productoCreado = {
      id: dataProducto.id_pro,
      producto: dataProducto.desc_pro,
      precio: dataProducto.precio_pro,
      imagen: dataProducto.img_pro
    }
    return productoCreado
  } catch (error) {
    throw new MyError(error.message, error.status);
  }
}

export const updateProductoSvc = async ({
  id,
  nombre,
  precio1,
  precio2,
  precio3,
  imagen,
  id_categoria,
  id_impuesto,
}) => {

  try {
    const existProducto = await prisma.productos.findFirst({
      where: {
        id_pro: parseInt(id)
      }
    })

    if (!existProducto) {
      throw new MyError('El producto no existe', 400)
    }

    const dataProducto = await prisma.productos.update({
      where: {
        id_pro: parseInt(id)
      },
      data: {
        desc_pro: nombre,
        precio_pro: precio1,
        precio2_pro: precio2,
        precio3_pro: precio3,
        img_pro: imagen,
        fecha_pro: new Date(),
        categorias: {
          connect: {
            id_cate: id_categoria
          }
        },
        impuesto: {
          connect: {
            id_imp: id_impuesto
          }
        },
      }
    })
    const productoActualizado = {
      id: dataProducto.id_pro,
      producto: dataProducto.desc_pro,
      precio: dataProducto.precio_pro,
      imagen: dataProducto.img_pro
    }
    return productoActualizado
  } catch (error) {
    throw new MyError(error.message, error.status);
  }
}

export const deleteProductoSvc = async ({ id }) => {

  try {
    const existProducto = await prisma.productos.findFirst({
      where: {
        id_pro: parseInt(id)
      }
    })
    if (!existProducto) {
      throw new MyError('El producto no existe', 400)
    }
    const dataProducto = await prisma.productos.delete({
      where: {
        id_pro: parseInt(id)
      }
    })
    const productoEliminado = {
      id: dataProducto.id_pro,
      producto: dataProducto.desc_pro,
      precio: dataProducto.precio_pro,
      imagen: dataProducto.img_pro
    }
    return productoEliminado
  } catch (error) {
    throw new MyError(error.message, error.status);
  }
}