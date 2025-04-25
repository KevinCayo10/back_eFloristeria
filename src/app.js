import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // Agregamos el middleware de CORS
import { router } from "./routes/routes.js";

class ServerApp {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.hostname = process.env.HOSTNAME || "localhost";
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: "*",
        // credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );
  }

  initializeRoutes() {
    this.app.use("/api", router);
    this.app.use((req, res) => {
      res.status(404).json({ message: "Not Found" });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export { ServerApp };
