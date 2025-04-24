/**
 * @file productoRoutes.js
 * @description Rutas para las operaciones CRUD de la entidad Producto.
 */

const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

// Rutas CRUD para Productos
router
  .route("/productos")
  .get(productoController.getAllProductos) // Obtener todos los productos
  .post(productoController.createProducto); // Crear un nuevo producto

router
  .route("/productos/:id")
  .get(productoController.getProductoById) // Obtener producto por ID
  .put(productoController.updateProducto) // Actualizar producto por ID
  .delete(productoController.deleteProducto); // Eliminar producto por ID

module.exports = router;
