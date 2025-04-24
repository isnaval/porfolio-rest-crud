# 🚀 API DATOS - Management System for Sales, Products and Customers

## 📊 MERN Platform for Data Management

![Project Banner](https://via.placeholder.com/1200x400.png?text=API+DATOS)

### 📌 Project Description

The **API DATOS** application is a management system designed to optimize sales, product, and customer operations. Using the MERN stack (MariaDB, Express, React, Node.js), this platform allows efficient CRUD operations, ensuring a simple and intuitive workflow.

---

### 🛠 Main Technologies

| Technology      | Function            | Description                                    |
| --------------- | ------------------- | ---------------------------------------------- |
| 🌐 **Frontend** | React + Material-UI | Intuitive and adaptive interface for end users |
| ⚙️ **Backend**  | Node.js + Express   | Business logic management and REST API         |
| 🗄️ **Database** | MariaDB             | Structured data storage for the system         |
| 🔄 **API**      | Axios               | Communication between frontend and backend     |

---

### ✨ Main Features

1. **Customer Management**

   - Registration, editing, viewing, and deletion of customer data.
   - Efficient management of relevant information.

2. **Product Management**

   - Complete control of product data, including prices and costs.

3. **Sales Management**

   - Order registration and calculation of total amounts.

4. **Adaptive Interface**
   - Optimized for modern browsers and mobile devices.

---

### 🏗️ Project Structure

```plaintext
API-DATOS/
├── backend/          # Business logic and REST API
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/         # User interface
│   ├── src/
│   │   ├── components/
│   │   ├── config.js
│   │   └── App.js
└── package.json
```

### 🔧 Installation and Configuration

#### Prerequisites

- Node.js
- MariaDB
- npm

#### Installation Steps

1. - Clone the Repository

   ```
   git clone [repository-url]
   cd API-DATOS
   ```

2. - Install All Dependencies (backend and frontend)

   ```
   npm run install:all
   ```

3. - Configure Database
   - CREATE DATABASE ventas_db;

4. - Configure Environment Variables. Create a .env file in /backend with the following content:

   ```plaintext
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=ventas_db
   DB_PORT=3306
   PORT=5000
   ```

5. - Start the Application
   ```
   npm start
   ```

### 🗂 API Endpoints

```plaintext
Customers
GET /api/clientes
GET /api/clientes/:id
POST /api/clientes
PUT /api/clientes/:id
DELETE /api/clientes/:id

Products
GET /api/productos
GET /api/productos/:id
POST /api/productos
PUT /api/productos/:id
DELETE /api/productos/:id

Sales
GET /api/ventas
GET /api/ventas/:id
POST /api/ventas
PUT /api/ventas/:id
DELETE /api/ventas/:id
```

## 📄 Database

### Customers Table

```sql
CREATE TABLE clientes (
id_cliente VARCHAR(50) PRIMARY KEY,
zona VARCHAR(100),
pais VARCHAR(100)
);
```

### Products Table

```sql
CREATE TABLE productos (
id_producto VARCHAR(50) PRIMARY KEY,
tipo_producto VARCHAR(100),
precio_unitario DECIMAL(10,2),
coste_unitario DECIMAL(10,2)
);
```

### Sales Table

```sql
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
```

## 🎯 Project Objectives

- Simplify the management of sales, product, and customer data.
- Create a system adaptable to business needs.
- Offer an efficient and accessible workflow.

### 📄 License

This project is under the ISC License.

### 🔍 Upcoming Improvements

- Implement interactive charts for data analysis.
- Add user authentication.
- Optimize interface for mobile devices.

### ✉️ Contact

API DATOS - Created by Ismael
