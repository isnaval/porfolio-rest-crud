require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { testConnection, initializeDatabase } = require("./config/database");
const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await testConnection();
    await initializeDatabase();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
      cors({
        origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });

    app.get("/", (req, res) => {
      res.json({ message: "Servidor activo" });
    });

    const clienteRoutes = require("./routes/clienteRoutes");
    const productoRoutes = require("./routes/productoRoutes");
    const ventaRoutes = require("./routes/ventaRoutes");

    app.use("/api", clienteRoutes);
    app.use("/api", productoRoutes);
    app.use("/api", ventaRoutes);

    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: err.message || "Error interno del servidor",
      });
    });

    app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: "Ruta no encontrada",
      });
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
