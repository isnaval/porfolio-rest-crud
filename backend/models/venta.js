/**
 * @file venta.js
 * @description Modelo de datos para la entidad Venta.
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Venta = sequelize.define(
  "Venta",
  {
    id_venta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    canal_venta: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    prioridad: {
      type: DataTypes.STRING(20),
      defaultValue: "media",
    },
    fecha_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_envio: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    unidades: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: "Las unidades deben ser al menos 1",
        },
      },
    },
    importe_venta_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    importe_coste_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "ventas",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

// Métodos estáticos para operaciones CRUD
Venta.getAllVentas = async () => {
  return await Venta.findAll();
};

Venta.getVentaById = async (id) => {
  const venta = await Venta.findByPk(id);
  if (!venta) {
    throw new Error(`Venta con ID ${id} no encontrada`);
  }
  return venta;
};

Venta.createVenta = async (data) => {
  if (data.importe_venta_total < data.importe_coste_total) {
    throw new Error(
      "El importe total de la venta no puede ser menor que el coste total"
    );
  }
  return await Venta.create(data);
};

Venta.updateVenta = async (id, data) => {
  const venta = await Venta.getVentaById(id);
  return await venta.update(data);
};

Venta.deleteVenta = async (id) => {
  const venta = await Venta.getVentaById(id);
  return await venta.destroy();
};

module.exports = Venta;
