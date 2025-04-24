/**
 * @file cliente.js
 * @description Modelo de datos para la entidad Cliente.
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Cliente = sequelize.define(
  "Cliente",
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    zona: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: "clientes",
    timestamps: false,
    // Añadidas opciones de modelo
    freezeTableName: true,
    underscored: true,
  }
);

// Métodos estáticos para operaciones CRUD
Cliente.getAllClientes = async () => {
  return await Cliente.findAll();
};

Cliente.getClienteById = async (id) => {
  return await Cliente.findByPk(id);
};

Cliente.createCliente = async (zona, pais) => {
  return await Cliente.create({ zona, pais });
};

Cliente.updateCliente = async (id, data) => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) throw new Error("Cliente no encontrado");
  return await cliente.update(data);
};

Cliente.deleteCliente = async (id) => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) throw new Error("Cliente no encontrado");
  return await cliente.destroy();
};

module.exports = Cliente;
