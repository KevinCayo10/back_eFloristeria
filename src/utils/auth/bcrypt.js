"use strict";
import bcrypt from "bcrypt";

const hashed = async (password) => {
  const passHash = await bcrypt.hash(password, 10);
  return passHash;
};

const verify = async (password, passHash) => {
  const result = await bcrypt.compare(password, passHash);
  return result;
};
export { hashed, verify };
