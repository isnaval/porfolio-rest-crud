# 🚀 API DATOS - Sistema de Gestión para Ventas, Productos y Clientes

## 📊 Plataforma MERN para Gestión de Datos

![Project Banner](https://via.placeholder.com/1200x400.png?text=API+DATOS)

### 📌 Descripción del Proyecto

La aplicación **API DATOS** es un sistema de gestión diseñado para optimizar las operaciones de ventas, productos y clientes. Utilizando el stack MERN (MariaDB, Express, React, Node.js), esta plataforma permite realizar operaciones CRUD de forma eficiente, asegurando un flujo de trabajo sencillo e intuitivo.

---

### 🛠 Tecnologías Principales

| Tecnología           | Función             | Descripción                                           |
| -------------------- | ------------------- | ----------------------------------------------------- |
| 🌐 **Frontend**      | React + Material-UI | Interfaz intuitiva y adaptativa para usuarios finales |
| ⚙️ **Backend**       | Node.js + Express   | Gestión de lógica de negocio y API REST               |
| 🗄️ **Base de Datos** | MariaDB             | Almacenamiento de datos estructurados para el sistema |
| 🔄 **API**           | Axios               | Comunicación entre frontend y backend                 |

---

### ✨ Características Principales

1. **Gestión de Clientes**

   - Registro, edición, visualización y eliminación de datos de clientes.
   - Gestión eficiente de información relevante.

2. **Gestión de Productos**

   - Control completo de los datos de productos, incluyendo precios y costes.

3. **Gestión de Ventas**

   - Registro de pedidos y cálculo de importes totales.

4. **Interfaz Adaptativa**
   - Optimizada para navegadores modernos y dispositivos móviles.

---

### 🏗️ Estructura del Proyecto

```plaintext
API-DATOS/
├── backend/          # Lógica de negocio y API REST
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/         # Interfaz de usuario
│   ├── src/
│   │   ├── components/
│   │   ├── config.js
│   │   └── App.js
└── package.json
```

### 🔧 Instalación y Configuración

#### Requisitos Previos

        - Node.js
        - MariaDB
        - npm

#### Pasos de Instalación

1. - Clonar el Repositorio
2. - Instalar Dependencias
3. - Configurar Base de Datos
   - CREATE DATABASE ventas_db;
4. - Configurar Variables de Entorno Crear un archivo .env en /backend con el siguiente contenido:

   plaintext
   Copiar código
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=ventas_db
   DB_PORT=3306
   PORT=5000

5. - Iniciar la Aplicación
     npm start

### 🗂 Endpoints API

Clientes
GET /api/clientes
GET /api/clientes/:id
POST /api/clientes
PUT /api/clientes/:id
DELETE /api/clientes/:id
Productos
GET /api/productos
GET /api/productos/:id
POST /api/productos
PUT /api/productos/:id
DELETE /api/productos/:id
Ventas
GET /api/ventas
GET /api/ventas/:id
POST /api/ventas
PUT /api/ventas/:id
DELETE /api/ventas/:id

## 📄 Base de Datos

### Tabla Clientes

CREATE TABLE clientes (
id_cliente VARCHAR(50) PRIMARY KEY,
zona VARCHAR(100),
pais VARCHAR(100)
);

### Tabla Productos

CREATE TABLE productos (
id_producto VARCHAR(50) PRIMARY KEY,
tipo_producto VARCHAR(100),
precio_unitario DECIMAL(10,2),
coste_unitario DECIMAL(10,2)
);

### Tabla Ventas

CREATE TABLE ventas (
id_venta INT AUTO_INCREMENT PRIMARY KEY,
id_cliente VARCHAR(50),
id_producto VARCHAR(50),
fecha_pedido DATE,
unidades INT,
importe_venta_total DECIMAL(10,2),
importe_coste_total DECIMAL(10,2),
FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

## 🎯 Objetivos del Proyecto

Simplificar la gestión de datos de ventas, productos y clientes.
Crear un sistema adaptable a necesidades empresariales.
Ofrecer un flujo de trabajo eficiente y accesible.

### 📄 Licencia

Este proyecto está bajo la Licencia ISC.

### 🔍 Próximas Mejoras

Implementar gráficos interactivos para análisis de datos.
Añadir autenticación de usuarios.
Optimizar la interfaz para dispositivos móviles.

### ✉️ Contacto

API DATOS - Creado por Ismael
