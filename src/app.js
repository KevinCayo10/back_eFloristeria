import express from "express";
import morgan from "morgan";
import usuarioRoutes from "./routes/usuario.route";

const app = express();

// Setting
app.set("port", 8000);

//Middleware
app.use(morgan("dev"));
app.use(express.json());

//Route
app.use("/api/usuarios", usuarioRoutes);

export default app;
