
import { createCategoriaSvc, deleteCategoriaSvc, getCategoriasSvc, getCategoriaSvc, updateCategoriaSvc } from "../../services/inventario/categorias.services";
import MyError from "../../utils/error";
export const getCategorias = async (req, res, next) => {
  try {
    const categorias = await getCategoriasSvc()
    res.json({
      status: 200,
      message: "Categorias obtenidas correctamente",
      data: categorias,
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
};

export const getCategoria = async (req, res, next) => {
  try {
    const { id } = req.params
    const categoria = await getCategoriaSvc({ id })
    res.json({
      status: 200,
      message: "Categoria obtenida correctamente",
      data: categoria,
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
}

export const createCategoria = async (req, res, next) => {
  try {
    const { categoria } = req.body
    const dataCategoria = await createCategoriaSvc({ categoria })
    res.json({
      status: 200,
      message: "Categoria registrada exitosamente",
      data: dataCategoria
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
}

export const updateCategoria = async (req, res, next) => {
  try {
    const { id } = req.params
    const { categoria } = req.body
    const response = await updateCategoriaSvc({ id, categoria })
    res.json({
      status: 200,
      message: "Categoria actualizada exitosamente",
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

export const deleteCategoria = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await deleteCategoriaSvc({ id })
    res.json({
      status: 200,
      message: "Categoria eliminada exitosamente",
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