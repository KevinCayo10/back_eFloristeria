import Bcrypt from "../../utils/bcrypt";
import Jwt from "../../utils/jwt";
import { PrismaClient } from "@prisma/client";
import Validate from "../../utils/validate";
const prisma = new PrismaClient();

class UsuarioController {
  constructor() {
    this.bcrypInstance = new Bcrypt();
    this.jwtInstance = new Jwt();
    this.validate = new Validate();
    this.register = this.register.bind(this); // Enlazar el método register
    this.login = this.login.bind(this); // Enlazar el método register
    this.getUsers = this.getUsers.bind(this); // Enlazar el método register
  }
  async register(req, res) {
    try {
      const userData = req.body;
      if (!this.validate.verifyEmail(userData.email_usu)) {
        console.log("Entro");
        return res.status(409).json({
          status: 409,
          message: "Usuario ya registrado",
        });
      }
      const user = await prisma.usuarios.create({
        data: {
          nom_usu: userData.nom_usu,
          ape_usu: userData.ape_usu,
          email_usu: userData.email_usu,
          celu_usu: userData.celu_usu,
          rol_usu: "cliente",
          pass_usu: await this.bcrypInstance.hashed(userData.pass_usu),
        },
      });
      const token = await this.jwtInstance.signIn(userData);
      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
          sameSite: "Strict",
          maxAge: 1000 * 60 * 60, // 1 hora
        })
        .json({
          status: 200,
          message: "Registro exitoso",
          data: {
            token: token,
            uuser: userData,
          },
        });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res) {
    try {
      const userData = req.body;
      const user = await prisma.usuarios.findUnique({
        where: {
          email_usu: userData.email_usu,
        },
      });
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "Usuario no encontrado",
        });
      }
      const isPasswordValid = await this.bcrypInstance.verify(
        userData.pass_usu,
        user.pass_usu
      );
      if (!isPasswordValid) {
        return res.status(404).json({
          status: 404,
          message: "Contraseña incorrecta",
        });
      }
      const token = await this.jwtInstance.signIn(user);
      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
          sameSite: "Strict",
          maxAge: 1000 * 60 * 60, // 1 hora
        })
        .json({
          status: 200,
          message: "Login exitoso",
          data: {
            token: token,
            user: user,
          },
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Error interno del servidor",
      });
    }
  }

  async getUsers(req, res) {
    try {
      const cookie = req.cookies.access_token;
      console.log("COOKIE : ", cookie);
      if (!cookie) {
        return res.status(401).json({
          status: 401,
          message: "No autorizado",
        });
      }
      const data = await this.jwtInstance.verifyToken(cookie);
      if (!data) {
        return res.status(401).json({
          status: 401,
          message: "No autorizado",
        });
      }
      const user = await prisma.usuarios.findFirst({
        where: {
          id_usu: data,
        },
      });
      console.log("USER : ", user);
      return res.status(200).json({
        status: 200,
        message: "Usuarios encontrados",
        data: {
          user: user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export { UsuarioController };
