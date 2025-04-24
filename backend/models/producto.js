/**
 * @file producto.js
 * @description Modelo de datos para la entidad Producto con validaciones y métodos mejorados.
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Producto = sequelize.define(
  "Producto",
  {
    id_producto: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    tipo_producto: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    coste_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    tableName: "productos",
    timestamps: false,
  }
);

Producto.getAllProductos = async () => {
  return await Producto.findAll();
};

Producto.getProductoById = async (id) => {
  return await Producto.findByPk(id);
};

Producto.createProducto = async (data) => {
  return await Producto.create(data);
};

Producto.updateProducto = async (id, data) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error("Producto no encontrado");
  return await producto.update(data);
};

Producto.deleteProducto = async (id) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error("Producto no encontrado");
  return await producto.destroy();
};

module.exports = Producto;
