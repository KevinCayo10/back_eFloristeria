class Jwt {
  constructor() {
    this.jwt = require("jsonwebtoken");
    this.key = process.env.JWT_KEY;
    this.timeExpire = "1h";
  }

  async signIn(user) {
    const token = await this.jwt.sign(user, this.key, {
      expiresIn: this.timeExpire,
    });
    return token;
  }

  async verifyToken(token) {
    const decoded = await this.jwt.verify(token, this.key);
    console.log("DECODED : ", decoded.id_usu);
    return decoded.id_usu;
  }
}

export default Jwt;
