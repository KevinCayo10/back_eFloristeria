import { PrismaClient } from "@prisma/client";
class Validate {
  constructor() {
    this.prisma = new PrismaClient();
    this.verifyEmail = this.verifyEmail.bind(this); // Enlazar el método register
  }
  async verifyEmail(email) {
    const data = await this.prisma.usuarios.findFirst({
      where: {
        email_usu: email,
      },
    });
    return data;
  }
}

export default Validate;
