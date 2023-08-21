// Lo q permite el dotenv es acceder a las variables de entorno

import { config } from "dotenv";

//Poner a disposicion q se pueda utilizar
config();

export default {
  host: process.env.HOST || "",
  database: process.env.DATABASE || "",
  user: process.env.USER || "",
  password: process.env.PASSWORD || "",
};
