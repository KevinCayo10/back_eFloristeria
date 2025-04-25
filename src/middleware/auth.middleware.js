import { verifyToken } from "../utils/auth/jwt";
import MyError from "../utils/error";

export const verifyBearerToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "No autorizado",
      });
    }
    const response = verifyToken(token);
    if (!response) {
      return res.status(401).json({
        status: 401,
        message: "No autorizado",
      });
    }
    req.user = response;
    next();
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
};
