import { getConnection } from "../database/database";

const getProductos = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT pro.id_pro, pro.desc_pro, pro.pre_pro, pro.img_pro, cate.categoria FROM productos as pro, categorias as cate  WHERE pro.id_cate_pro = cate.id_cate"
    );

    // Mapea los resultados para obtener un arreglo de productos
    const productos = result.map((row) => ({
      id_pro: row.id_pro,
      desc_pro: row.desc_pro,
      pre_pro: row.pre_pro,
      img_pro: row.img_pro,
      categoria: row.categoria,
    }));

    return res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

const getProducto = async (req, res) => {
  try {
    const connection = await getConnection();
    const id = req.params.id;
    console.log(id);
    const result = await connection.query(
      "SELECT pro.id_pro, pro.desc_pro, pro.pre_pro,pro.img_pro, cate.categoria FROM productos as pro, categorias as cate  WHERE  pro.id_pro = ? and pro.id_cate_pro = cate.id_cate ",
      [id]
    );
    if (result.length == 0) {
      return res.status(400).jsn({ message: "Producto no encontrado" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const guardarProducto = async (req, res) => {
  try {
    const producto = req.body;
    const connection = await getConnection();
    const result = await connection.query(
      "INSERT INTO productos (id_pro, desc_pro, pre_pro,img_pro, id_cate_pro ) VALUES (?,?,?,?,?)",
      [
        producto.id_pro,
        producto.desc_pro,
        producto.pre_pro,
        producto.img_pro,
        producto.id_cate_pro,
      ]
    );
    return res.status(201).json({ message: "Guardado exitoso" });
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
};

const getOrderTimeProduct = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT pro.id_pro, pro.desc_pro, pro.pre_pro, pro.img_pro, cate.categoria FROM productos AS pro JOIN categorias AS cate ON pro.id_cate_pro = cate.id_cate ORDER BY pro.created_time DESC LIMIT 4"
    );
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
