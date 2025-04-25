"use strict"
const SECRET_KEY = process.env.JWT_KEY;
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const token = jwt.sign(user, SECRET_KEY, {
    expiresIn: '6d',
  });
  return token;
};

const verifyToken = (token) => {
  const isCorrect = jwt.verify(token, SECRET_KEY);
  return isCorrect;
};
export { generateToken, verifyToken };
