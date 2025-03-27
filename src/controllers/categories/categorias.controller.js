const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categorias.findMany();
    console.log("categorias : ", categorias);
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export { getCategorias };
