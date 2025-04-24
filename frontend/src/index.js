/**
 * @fileoverview Punto de entrada principal de la aplicación React
 * @description Inicializa la aplicación React con Material-UI Theme Provider
 * y CssBaseline para normalización de estilos. Utiliza createRoot para
 * el renderizado en React 18.
 * @requires react
 * @requires react-dom/client
 * @requires @mui/material
 */

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
