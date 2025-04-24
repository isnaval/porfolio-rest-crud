/**
 * @file ventaController.js
 * @description Controlador para las operaciones CRUD de ventas.
 *
 * Este controlador permite realizar las siguientes operaciones sobre las ventas:
 * - Crear una nueva venta.
 * - Obtener todas las ventas o una venta específica mediante su ID.
 * - Actualizar la información de una venta existente.
 * - Eliminar una venta de la base de datos.
 */

/**
 * ventaController.js
 */
const VentaModel = require("../models/venta");

exports.getAllVentas = async (req, res) => {
  try {
    const ventas = await VentaModel.getAllVentas();
    res.json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({
      error: "Error al obtener las ventas",
      details: error.message,
    });
  }
};

exports.getVentaById = async (req, res) => {
  try {
    const ventaId = req.params.id;

    if (!ventaId) {
      return res.status(400).json({ error: "ID de venta requerido" });
    }

    const venta = await VentaModel.getVentaById(ventaId);
    if (!venta) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }

    res.json(venta);
  } catch (error) {
    console.error("Error al obtener venta por ID:", error);
    res.status(500).json({
      error: "Error al obtener la venta",
      details: error.message,
    });
  }
};

exports.createVenta = async (req, res) => {
  try {
    const {
      id_cliente,
      id_producto,
      fecha_pedido,
      unidades,
      importe_venta_total,
      importe_coste_total,
    } = req.body;

    if (!id_cliente || !id_producto || !fecha_pedido || !unidades) {
      return res.status(400).json({
        error: "Todos los campos son requeridos",
        requiredFields: [
          "id_cliente",
          "id_producto",
          "fecha_pedido",
          "unidades",
        ],
      });
    }

    if (
      isNaN(unidades) ||
      isNaN(importe_venta_total) ||
      isNaN(importe_coste_total)
    ) {
      return res.status(400).json({
        error: "Las unidades e importes deben ser valores numéricos",
      });
    }

    const nuevaVenta = await VentaModel.createVenta(
      id_cliente,
      id_producto,
      fecha_pedido,
      unidades,
      importe_venta_total,
      importe_coste_total
    );

    res.status(201).json({
      message: "Venta creada exitosamente",
      venta: nuevaVenta,
    });
  } catch (error) {
    console.error("Error al crear venta:", error);
    res.status(500).json({
      error: "Error al crear la venta",
      details: error.message,
    });
  }
};

exports.updateVenta = async (req, res) => {
  try {
    const ventaId = req.params.id;
    const {
      id_cliente,
      id_producto,
      fecha_pedido,
      unidades,
      importe_venta_total,
      importe_coste_total,
    } = req.body;

    if (!ventaId) {
      return res.status(400).json({ error: "ID de venta requerido" });
    }

    const ventaExistente = await VentaModel.getVentaById(ventaId);
    if (!ventaExistente) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }

    if (
      (unidades && isNaN(unidades)) ||
      (importe_venta_total && isNaN(importe_venta_total)) ||
      (importe_coste_total && isNaN(importe_coste_total))
    ) {
      return res.status(400).json({
        error: "Las unidades e importes deben ser valores numéricos",
      });
    }

    const ventaActualizada = await VentaModel.updateVenta(ventaId, {
      id_cliente: id_cliente || ventaExistente.id_cliente,
      id_producto: id_producto || ventaExistente.id_producto,
      fecha_pedido: fecha_pedido || ventaExistente.fecha_pedido,
      unidades: unidades || ventaExistente.unidades,
      importe_venta_total:
        importe_venta_total || ventaExistente.importe_venta_total,
      importe_coste_total:
        importe_coste_total || ventaExistente.importe_coste_total,
    });

    res.json({
      message: "Venta actualizada exitosamente",
      venta: ventaActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar venta:", error);
    res.status(500).json({
      error: "Error al actualizar la venta",
      details: error.message,
    });
  }
};

exports.deleteVenta = async (req, res) => {
  try {
    const ventaId = req.params.id;

    if (!ventaId) {
      return res.status(400).json({ error: "ID de venta requerido" });
    }

    const ventaExistente = await VentaModel.getVentaById(ventaId);
    if (!ventaExistente) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }

    await VentaModel.deleteVenta(ventaId);
    res.status(200).json({
      message: "Venta eliminada exitosamente",
      deletedId: ventaId,
    });
  } catch (error) {
    console.error("Error al eliminar venta:", error);
    res.status(500).json({
      error: "Error al eliminar la venta",
      details: error.message,
    });
  }
};
