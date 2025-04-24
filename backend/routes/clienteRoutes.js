/**
 * @file clienteRoutes.js
 * @description Define las rutas para las operaciones CRUD de la entidad Cliente.
 *
 * Este archivo de rutas expone los endpoints para gestionar clientes, incluyendo las siguientes operaciones:
 * - Obtener todos los clientes: `GET /clientes`
 * - Obtener un cliente específico por su ID: `GET /clientes/:id`
 * - Crear un nuevo cliente: `POST /clientes`
 * - Actualizar un cliente existente: `PUT /clientes/:id`
 * - Eliminar un cliente: `DELETE /clientes/:id`
 */

const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

router.get("/clientes", clienteController.getAllClientes);
router.get("/clientes/:id", clienteController.getClienteById);
router.post("/clientes", clienteController.createCliente);
router.put("/clientes/:id", clienteController.updateCliente);
router.delete("/clientes/:id", clienteController.deleteCliente);

module.exports = router;
