"use strict"
import { PrismaClient } from "@prisma/client";
import MyError from "../../utils/error";

export const getCategoriasSvc = async () => {
  const prisma = new PrismaClient()
  try {
    const dataCategorias = await prisma.categorias.findMany()

    const categorias = dataCategorias.map((cate) => ({
      id: cate.id_cate,
      categoria: cate.categoria
    }))

    return categorias
  } catch (error) {
    throw new MyError(error.message, error.status);
  } finally {
    prisma.$disconnect()
  }
}

export const getCategoriaSvc = async ({ id }) => {
  const prisma = new PrismaClient()
  try {
    const dataCategoria = await prisma.categorias.findUnique({
      where: {
        id_cate: parseInt(id)
      }
    })

    const categoria = {
      id: dataCategoria.id_cate,
      categoria: dataCategoria.categoria
    }

    return categoria
  } catch (error) {
    throw new MyError(error.message, error.status);
  } finally {
    prisma.$disconnect()
  }
}

export const createCategoriaSvc = async ({
  categoria
}) => {
  const prisma = new PrismaClient()
  try {
    const existCategoria = await prisma.categorias.findFirst({
      where: {
        categoria
      }
    })

    if (existCategoria) {
      throw new MyError('La categoria ya existe', 400)
    }
    const dataCategoria = await prisma.categorias.create({
      data: {
        categoria
      }
    })
    const categoriaCreada = {
      id: dataCategoria.id_cate,
      categoria: dataCategoria.categoria
    }

    return categoriaCreada
  } catch (error) {
    throw new MyError(error.message, error.status);
  } finally {
    prisma.$disconnect()
  }
}

export const updateCategoriaSvc = async ({
  id, categoria
}) => {
  const prisma = new PrismaClient()
  try {
    const existCategoria = await prisma.categorias.findFirst({
      where: {
        id_cate: parseInt(id)
      }
    })

    if (!existCategoria) {
      throw new MyError('La categoria no existe', 400)
    }


    const existCategoriaUpdate = await prisma.categorias.findFirst({
      where: {
        categoria
      }
    })
    if (existCategoriaUpdate) {
      throw new MyError('La categoria ya existe', 400)
    }

    const dataCategoria = await prisma.categorias.update({
      where: {
        id_cate: parseInt(id)
      },
      data: {
        categoria
      }
    })

    const categoriaActualizada = {
      id: dataCategoria.id_cate,
      categoria: dataCategoria.categoria
    }

    return categoriaActualizada
  } catch (error) {
    throw new MyError(error.message, error.status);
  } finally {
    prisma.$disconnect()
  }
}

export const deleteCategoriaSvc = async ({
  id
}) => {
  const prisma = new PrismaClient()
  try {
    const existCategoria = await prisma.categorias.findFirst({
      where: {
        id_cate: parseInt(id)
      }
    })

    if (!existCategoria) {
      throw new MyError('La categoria no existe', 400)
    }

    const dataCategoria = await prisma.categorias.delete({
      where: {
        id_cate: parseInt(id)
      }
    })

    const categoriaEliminada = {
      id: dataCategoria.id_cate,
      categoria: dataCategoria.categoria
    }

    return categoriaEliminada
  } catch (error) {
    throw new MyError(error.message, error.status);
  } finally {
    prisma.$disconnect()
  }
}