/**
 * @file clienteController.js
 * @description Controlador para las operaciones CRUD de clientes.
 *
 * Este controlador permite realizar las siguientes operaciones sobre los clientes:
 * - Crear un nuevo cliente.
 * - Obtener todos los clientes o un cliente específico mediante su ID.
 * - Actualizar la información de un cliente existente.
 * - Eliminar un cliente de la base de datos.
 */

const ClienteModel = require("../models/cliente");

exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await ClienteModel.getAllClientes();
    res.json(clientes);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({
      error: "Error al obtener los clientes",
      details: error.message,
    });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const clienteId = req.params.id;
    if (!clienteId) {
      return res.status(400).json({ error: "ID de cliente requerido" });
    }

    const cliente = await ClienteModel.getClienteById(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(cliente);
  } catch (error) {
    console.error("Error al obtener cliente por ID:", error);
    res.status(500).json({
      error: "Error al obtener el cliente",
      details: error.message,
    });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const { id_cliente, zona, pais } = req.body;

    if (!id_cliente || !zona || !pais) {
      return res.status(400).json({
        error: "Todos los campos son requeridos",
        requiredFields: ["id_cliente", "zona", "pais"],
      });
    }

    const nuevoCliente = await ClienteModel.createCliente(
      id_cliente,
      zona,
      pais
    );
    res.status(201).json({
      message: "Cliente creado exitosamente",
      cliente: nuevoCliente,
    });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({
      error: "Error al crear el cliente",
      details: error.message,
    });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const clienteId = req.params.id;
    const { zona, pais } = req.body;

    if (!clienteId) {
      return res.status(400).json({ error: "ID de cliente requerido" });
    }

    const clienteExistente = await ClienteModel.getClienteById(clienteId);
    if (!clienteExistente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const clienteActualizado = await ClienteModel.updateCliente(
      clienteId,
      zona || clienteExistente.zona,
      pais || clienteExistente.pais
    );

    res.json({
      message: "Cliente actualizado exitosamente",
      cliente: clienteActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({
      error: "Error al actualizar el cliente",
      details: error.message,
    });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const clienteId = req.params.id;

    if (!clienteId) {
      return res.status(400).json({ error: "ID de cliente requerido" });
    }

    const clienteExistente = await ClienteModel.getClienteById(clienteId);
    if (!clienteExistente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    await ClienteModel.deleteCliente(clienteId);
    res.status(200).json({
      message: "Cliente eliminado exitosamente",
      deletedId: clienteId,
    });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({
      error: "Error al eliminar el cliente",
      details: error.message,
    });
  }
};
