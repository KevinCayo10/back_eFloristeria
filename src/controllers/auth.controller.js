import Bcrypt from "../utils/bcrypt";
import Jwt from "../utils/jwt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class AuthController {
  constructor() {
    this.bcrypInstance = new Bcrypt();
    this.jwtInstance = new Jwt();
    this.register = this.register.bind(this); // Enlazar el método register
    this.login = this.login.bind(this); // Enlazar el método register
  }
  async register(req, res) {
    try {
      const userData = req.body;
      const user = await prisma.usuarios.create({
        data: {
          nom_usu: userData.nom_usu,
          ape_usu: userData.ape_usu,
          email_usu: userData.email_usu,
          celu_usu: userData.celu_usu,
          pass_usu: await this.bcrypInstance.hashed(userData.pass_usu),
        },
      });
      return res.status(200).json({
        status: 200,
        message: "Registro exitoso",
        data: {
          token: await this.jwtInstance.signIn(userData),
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
      return res.status(200).json({
        status: 200,
        message: "Login exitoso",
        data: {
          token: await this.jwtInstance.signIn(user),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthController;
