import { getConnection } from "./../database/database";

const getUsuarios = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT id_usuario, cedula, nombre, apellido, rol, correo, contrasena FROM usuario"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    console.log(id_usuario);
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT id_usuario, cedula, nombre, apellido, rol, correo, contrasena FROM usuario WHERE id_usuario=?",
      id_usuario
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addUsuario = async (req, res) => {
  try {
    const connection = await getConnection();
    const { cedula, nombre, apellido, rol, correo, contrasena } = req.body;

    if (cedula === undefined || contrasena === undefined) {
      res.status(400).json({ message: "Bad Request. Please fill all field" });
    }

    const usuario = { cedula, nombre, apellido, rol, correo, contrasena };
    const result = await connection.query(
      " INSERT INTO usuario SET ?",
      usuario
    );
    res.json("Usuario Guardado");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { cedula, nombre, apellido, rol, correo, contrasena } = req.body;
    const usuario = { cedula, nombre, apellido, rol, correo, contrasena };
    console.log(`Id : ${id_usuario}`);
    console.log(usuario);
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE usuario SET ? WHERE id_usuario = ?",
      [usuario, id_usuario]
    );
    console.log(result);
    res.json("Actualizado Usuario");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    console.log(id_usuario);
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM usuario WHERE id_usuario=?",
      id_usuario
    );
    console.log(result);
    res.json("Eliminado Usuario");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getUsuarios,
  getUsuario,
  addUsuario,
  updateUsuario,
  deleteUsuario,
};
