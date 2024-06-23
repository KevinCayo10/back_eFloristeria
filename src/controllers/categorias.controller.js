import { getConnection } from "../database/database";

const getCategorias = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT id_cate, categoria FROM categorias"
    );
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getCategorias,
};
