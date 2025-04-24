/**
 * @fileoverview Componente principal de la aplicación
 * @description Estructura base de la aplicación que organiza los componentes ClientList, ProductList y SaleList
 * en un diseño responsive utilizando Material-UI.
 * @requires react
 * @requires @mui/material
 */

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import ClientList from "./components/ClientList";
import ProductList from "./components/ProductList";
import SaleList from "./components/SaleList";
import theme from "./styles/theme";
import "./App.css";

function App() {
  const instructions = [
    {
      title: "Gestión de base de datos:",
      description:
        "Este ejercicio está diseñado para la gestión de una base de datos utilizando MariaDB, con tres tablas principales que almacenan la información gestionada por la aplicación.",
    },
    {
      title: "Frontend & Backend ",
      description:
        "El frontend ha sido desarrollado en React. El backend, construido con Node.js, gestiona las operaciones de la base de datos y procesa las solicitudes del usuario.",
    },
    {
      title: "Entidades principales & Operaciones CRUD:",
      description:
        "La aplicación interactúa con tres entidades principales: clientes, ventas y productos. Los usuarios pueden realizar operaciones de CRUD (Crear, Leer, Actualizar, Eliminar) para interactuar completamente con los datos almacenados.",
    },

    {
      title: "Actualización del navegador:",
      description:
        "Actua como boton de volver a la pantalla inicial, resetear las acciones que se han realizado por parte dle usuario",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" className="container">
        <Box sx={{ my: 4 }}>
          {/* HEADER */}
          <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
            <Toolbar>
              <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                Sistema de Gestión
              </Typography>
            </Toolbar>
          </AppBar>

          {/* INSTRUCCIONES */}
          <Typography
            variant="body2" // Tamaño más pequeño
            align="center"
            sx={{ marginBottom: 4, color: "#555" }}
          >
            <div className="instructions">
              {instructions.map((item, index) => (
                <div key={index} className="instruction-item">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "#1976d2" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </div>
              ))}
            </div>
          </Typography>

          {/* COMPONENTES PRINCIPALES */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ClientList />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProductList />
            </Grid>
            <Grid item xs={12} md={6}>
              <SaleList />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
