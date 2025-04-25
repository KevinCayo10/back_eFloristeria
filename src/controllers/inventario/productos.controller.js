import { createProductoSvc, deleteProductoSvc, getProductosSvc, getProductoSvc, updateProductoSvc } from "../../services/inventario/productos.services";
import MyError from "../../utils/error";

export const getProductos = async (req, res, next) => {
  try {
    const listProductos = await getProductosSvc()
    return res.json({
      status: 200,
      message: "Productos obtenidos correctamente",
      data: listProductos,
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
};

export const getProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dataProducto = await getProductoSvc({ id });

    return res.json({
      status: 200,
      message: "Producto obtenido correctamente",
      data: dataProducto,
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
};

export const createProducto = async (req, res, next) => {
  try {
    const { nombre, precio1, precio2, precio3, id_categoria, id_impuesto } = req.body;
    const { filename } = req.file;
    const dataProducto = await createProductoSvc({
      nombre,
      precio1,
      precio2,
      precio3,
      imagen: filename,
      id_categoria,
      id_impuesto,

    });
    return res.json({
      status: 200,
      message: "Producto registrado exitosamente",
      data: dataProducto
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
};

export const updateProducto = async (req, res, next) => {
  try {
    const { id } = req.params
    const { nombre, precio1, precio2, precio3, id_categoria, id_impuesto } = req.body
    const { filename } = req.file
    const dataProducto = await updateProductoSvc({
      id,
      nombre,
      precio1,
      precio2,
      precio3,
      imagen: filename,
      id_categoria,
      id_impuesto
    })
    return res.json({
      status: 200,
      message: "Producto actualizado exitosamente",
      data: dataProducto
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
}

export const deleteProducto = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await deleteProductoSvc({ id })
    res.json({
      status: 200,
      message: "Producto eliminado exitosamente",
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

// const getOrderTimeProduct = async (req, res, next) => {
//   try {
//     const result = await prisma.productos.findMany({
//       include: {
//         categorias: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//       take: 4,
//     });
//     return res.status(200).json(result);
//   } catch (error) {
//     if (!error?.serverMessage) {
//       next(new MyError(error.message, ('Error interno'), 500, true));
//       return;
//     }
//     next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
//   }
// };

