/**
 * @file productoController.js
 * @description Controlador para las operaciones CRUD de productos.
 *
 * Este controlador permite realizar las siguientes operaciones sobre los productos:
 * - Buscar un producto específico mediante su ID.
 * - Eliminar un producto de la base de datos mediante su ID.
 * - (Opcional) Listar todos los productos disponibles.
 */
/**
 * productoController.js
 */

const ProductoModel = require("../models/producto");

exports.getAllProductos = async (req, res) => {
  try {
    const productos = await ProductoModel.getAllProductos();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.createProducto = async (req, res) => {
  try {
    const { tipo, precio_unitario, coste_unitario, stock } = req.body;

    const nuevoProducto = await ProductoModel.createProducto({
      tipo,
      precio_unitario,
      coste_unitario,
      stock: stock || 0,
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getProductoById = async (req, res) => {
  try {
    const producto = await ProductoModel.getProductoById(req.params.id);
    res.json(producto);
  } catch (error) {
    if (error.message.includes("no encontrado")) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const { tipo, precio_unitario, coste_unitario, stock, estado } = req.body;
    const producto = await ProductoModel.updateProducto(req.params.id, {
      tipo,
      precio_unitario,
      coste_unitario,
      stock,
      estado,
    });
    res.json(producto);
  } catch (error) {
    if (error.message.includes("no encontrado")) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.deleteProducto = async (req, res) => {
  try {
    await ProductoModel.deleteProducto(req.params.id);
    res.status(200).json({ message: "Producto desactivado exitosamente" });
  } catch (error) {
    if (error.message.includes("no encontrado")) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
