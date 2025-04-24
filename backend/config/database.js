/**
 * @file database.js
 * @description Configuración de la conexión a la base de datos usando Sequelize.
 */

const { Sequelize } = require("sequelize");

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log,
    dialectOptions: {
      connectTimeout: 60000,
    },
  }
);

// Probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✓ Conexión establecida correctamente con la base de datos.");
    return true;
  } catch (error) {
    console.error("✗ Error de conexión:", error.message);
    throw error; // Propagamos el error para manejarlo en el servidor
  }
};

// Inicializar la base de datos
const initializeDatabase = async () => {
  try {
    // Sincronizar todos los modelos
    await sequelize.sync({ alter: false }); // alter: true solo en desarrollo
    console.log("✓ Base de datos sincronizada");
  } catch (error) {
    console.error("✗ Error al sincronizar la base de datos:", error);
    throw error;
  }
};

module.exports = {
  sequelize,
  testConnection,
  initializeDatabase,
};
