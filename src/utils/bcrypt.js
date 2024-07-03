class Bcrypt {
  constructor() {
    this.bcrypt = require("bcrypt");
    this.saltRounds = 10;
  }
  async hashed(password) {
    const passHash = await this.bcrypt.hash(password, this.saltRounds);
    console.log("password : ", passHash);
    return passHash;
  }

  async verify(password, passHash) {
    const result = await this.bcrypt.compare(password, passHash);
    console.log("result : ", result);
    return result;
  }
}
export default Bcrypt;
