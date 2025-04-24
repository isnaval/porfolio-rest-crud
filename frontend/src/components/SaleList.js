import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";

function SaleList() {
  const [sales, setSales] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSale, setCurrentSale] = useState({
    id: "",
    id_cliente: "",
    id_producto: "",
    fecha_pedido: "",
    unidades: "",
  });

  const fetchSales = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/api/ventas`);
      setSales(response.data);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
    }
  };

  const searchSaleById = async () => {
    if (!searchId) {
      alert("Ingresa un ID para buscar.");
      return;
    }
    try {
      const response = await axios.get(
        `${config.backendUrl}/api/ventas/${searchId}`
      );
      setSales([response.data]);
    } catch (error) {
      console.error("Error al buscar venta:", error);
    }
  };

  const deleteSaleById = async () => {
    if (!deleteId) {
      alert("Ingresa un ID para eliminar.");
      return;
    }
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar la venta con ID ${deleteId}?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${config.backendUrl}/api/ventas/${deleteId}`);
        fetchSales();
        setDeleteId("");
      } catch (error) {
        console.error("Error al eliminar venta:", error);
      }
    }
  };

  const handleClickOpen = (
    sale = {
      id: "",
      id_cliente: "",
      id_producto: "",
      fecha_pedido: "",
      unidades: "",
    }
  ) => {
    setCurrentSale(sale);
    setEditMode(!!sale.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentSale({
      id: "",
      id_cliente: "",
      id_producto: "",
      fecha_pedido: "",
      unidades: "",
    });
  };

  const handleChange = (e) => {
    setCurrentSale({ ...currentSale, [e.target.name]: e.target.value });
  };

  const handleSaveSale = async () => {
    try {
      if (editMode) {
        await axios.put(
          `${config.backendUrl}/api/ventas/${currentSale.id}`,
          currentSale
        );
      } else {
        await axios.post(`${config.backendUrl}/api/ventas`, currentSale);
      }
      fetchSales();
      handleClose();
    } catch (error) {
      console.error("Error al guardar venta:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ p: 2 }}>
        Sistema de Gestión de Ventas
      </Typography>

      <Box sx={{ display: "flex", gap: 2, padding: "10px" }}>
        <Button variant="contained" onClick={fetchSales}>
          Cargar Ventas
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleClickOpen()}
        >
          Crear Venta
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, padding: "10px" }}>
        <TextField
          label="Buscar Venta por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Button variant="contained" onClick={searchSaleById}>
          Buscar
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, padding: "10px" }}>
        <TextField
          label="Eliminar Venta por ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <Button variant="contained" color="error" onClick={deleteSaleById}>
          Eliminar
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ID Cliente</TableCell>
              <TableCell>ID Producto</TableCell>
              <TableCell>Fecha Pedido</TableCell>
              <TableCell>Unidades</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.id_cliente}</TableCell>
                <TableCell>{sale.id_producto}</TableCell>
                <TableCell>{sale.fecha_pedido}</TableCell>
                <TableCell>{sale.unidades}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleClickOpen(sale)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Editar Venta" : "Añadir Venta"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="id"
            label="ID"
            value={currentSale.id}
            onChange={handleChange}
            fullWidth
            disabled={editMode}
          />
          <TextField
            margin="dense"
            name="id_cliente"
            label="ID Cliente"
            value={currentSale.id_cliente}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="id_producto"
            label="ID Producto"
            value={currentSale.id_producto}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="fecha_pedido"
            label="Fecha Pedido"
            type="date"
            value={currentSale.fecha_pedido}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="unidades"
            label="Unidades"
            type="number"
            value={currentSale.unidades}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSaveSale}>
            {editMode ? "Actualizar" : "Añadir"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SaleList;
