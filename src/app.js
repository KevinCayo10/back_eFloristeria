import express from "express";
import morgan from "morgan";
import productosRoutes from "./routes/productos.route";
import categoriasRoutes from "./routes/categorias.route";
import cors from "cors"; // Agregamos el middleware de CORS

const app = express();

// Setting
app.set("port", 4600);
//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//Route
app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);

export default app;
