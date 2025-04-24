/**
 * @file ventaRoutes.js
 * @description Rutas para las operaciones CRUD de la entidad Venta.
 */

const express = require("express");
const router = express.Router();
const ventaController = require("../controllers/ventaController");

// Rutas CRUD para Ventas
router
  .route("/ventas")
  .get(ventaController.getAllVentas) // Obtener todas las ventas
  .post(ventaController.createVenta); // Crear una nueva venta

router
  .route("/ventas/:id")
  .get(ventaController.getVentaById) // Obtener venta por ID
  .put(ventaController.updateVenta) // Actualizar venta por ID
  .delete(ventaController.deleteVenta); // Eliminar venta por ID

module.exports = router;
