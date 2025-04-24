# Sistema de Gestión de Ventas - Frontend

## 📋 Descripción

Sistema frontend para la gestión de ventas, clientes y productos desarrollado con React. Esta aplicación interactúa con una API RESTful para visualizar y gestionar datos de clientes, productos y ventas.

## 🚀 Características

- Visualización de clientes, productos y ventas.
- Funciones de búsqueda y filtrado en cada sección (clientes, productos, ventas).
- Interfaz de usuario intuitiva para CRUD de clientes, productos y ventas.
- Comunicación con el backend para operaciones en tiempo real.

## 🛠 Requisitos Previos

- **Node.js** >= 14.0.0
- **npm**

## ⚙ Instalación

1. **Clonar el repositorio**

   ```bash
   git clone [URL-del-repositorio]
   cd [nombre-del-proyecto]
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar el archivo de entorno**

   - En este frontend, asegúrate de que la URL del backend esté correctamente configurada en el código para conectarse a `http://localhost:5000` o el puerto correspondiente.

4. **Iniciar el servidor de desarrollo**

   ```bash
   npm start
   ```

   - Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en modo desarrollo.

## 🔄 Estructura del Proyecto (FRONTEND)

```plaintext
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ClienteList.js
│   │   ├── ProductoList.js
│   │   └── VentaList.js
│   ├── pages/
│   │   ├── Clientes.js
│   │   ├── Productos.js
│   │   └── Ventas.js
│   ├── services/
│   │   ├── clienteService.js
│   │   ├── productoService.js
│   │   └── ventaService.js
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## 📡 Comunicación con el Backend

Este frontend se conecta con un servidor backend que expone los siguientes endpoints:

### Clientes

- **GET** `/api/clientes` - Obtener la lista de clientes
- **POST** `/api/clientes` - Crear un nuevo cliente
- **PUT** `/api/clientes/:id` - Actualizar un cliente
- **DELETE** `/api/clientes/:id` - Eliminar un cliente

### Productos

- **GET** `/api/productos` - Obtener la lista de productos
- **POST** `/api/productos` - Crear un nuevo producto
- **PUT** `/api/productos/:id` - Actualizar un producto
- **DELETE** `/api/productos/:id` - Eliminar un producto

### Ventas

- **GET** `/api/ventas` - Obtener la lista de ventas
- **POST** `/api/ventas` - Crear una nueva venta
- **PUT** `/api/ventas/:id` - Actualizar una venta
- **DELETE** `/api/ventas/:id` - Eliminar una venta

## 🌐 Configuración de CORS

Para garantizar que el frontend pueda comunicarse con el backend, asegúrate de habilitar CORS en el servidor backend para permitir las solicitudes desde `http://localhost:3000`.

## 🔍 Pruebas y Depuración

Para depurar y probar el frontend:

1. Usa la consola del navegador para ver errores de JavaScript o advertencias.
2. Revisa la pestaña "Network" en las herramientas de desarrollador para verificar las solicitudes y respuestas de la API.
3. Usa `console.log` en el código para rastrear el flujo de datos y depurar.

## 📦 Despliegue

Para crear una versión optimizada para producción, ejecuta:

```bash
npm run build
```

Esto generará una carpeta `build` lista para ser desplegada en un servidor estático.

## 📚 Recursos Adicionales

- [Documentación de React](https://reactjs.org/docs/getting-started.html)
- [Documentación de Create React App](https://create-react-app.dev/docs/getting-started/)
