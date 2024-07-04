import express from "express";
import morgan from "morgan";
import productosRoutes from "./routes/productos.route";
import categoriasRoutes from "./routes/categorias.route";
import authRoutes from "./routes/auth.route";
import cookieParser from "cookie-parser";
import cors from "cors"; // Agregamos el middleware de CORS

const app = express();

// Setting
app.set("port", 4601);

// Middleware
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000", // Cambia esto al dominio de tu frontend
    credentials: true, // Permitir el envío de cookies
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/auth", authRoutes);

export default app;
