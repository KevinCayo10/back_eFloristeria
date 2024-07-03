const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getProductos = async (req, res) => {
  try {
    const listProducts = await prisma.productos.findMany({
      include: {
        categorias: true,
      },
    });

    console.log("Productos : ", listProducts);
    // Mapea los resultados para obtener un arreglo de productos

    return res.status(200).json(listProducts);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

const getProducto = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("ID : ", id);
    const product = await prisma.productos.findFirst({
      where: {
        id_pro: parseInt(id),
      },
      include: {
        categorias: true,
      },
    });
    console.log("product: ", product);
    if (product.length === 0) {
      return res.status(400).jsn({ message: "Producto no encontrado" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const guardarProducto = async (req, res) => {
  try {
    const producto = req.body;
    const resp = await prisma.productos.create({
      data: {
        id_pro: producto.id_pro,
        desc_pro: producto.desc_pro,
        pre_pro: producto.pre_pro,
        img_pro: producto.img_pro,
        id_cate_pro: producto.id_cate_pro,
      },
    });
    return res.status(201).json({ message: "Guardado exitoso" });
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
};

const getOrderTimeProduct = async (req, res) => {
  try {
    const result = await prisma.productos.findMany({
      include: {
        categorias: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};
export const methods = {
  getProductos,
  getProducto,
  getOrderTimeProduct,
  guardarProducto,
};
