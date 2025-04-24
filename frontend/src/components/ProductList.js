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

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    tipo_producto: "",
    precio_unitario: "",
    coste_unitario: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/api/productos`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const searchProductById = async () => {
    if (!searchId) {
      alert("Ingresa un ID para buscar.");
      return;
    }
    try {
      const response = await axios.get(
        `${config.backendUrl}/api/productos/${searchId}`
      );
      setProducts([response.data]);
    } catch (error) {
      console.error("Error al buscar producto:", error);
    }
  };

  const deleteProductById = async () => {
    if (!deleteId) {
      alert("Ingresa un ID para eliminar.");
      return;
    }
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar el producto con ID ${deleteId}?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${config.backendUrl}/api/productos/${deleteId}`);
        fetchProducts();
        setDeleteId("");
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  const handleClickOpen = (
    product = {
      id: "",
      tipo_producto: "",
      precio_unitario: "",
      coste_unitario: "",
    }
  ) => {
    setCurrentProduct(product);
    setEditMode(!!product.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct({
      id: "",
      tipo_producto: "",
      precio_unitario: "",
      coste_unitario: "",
    });
  };

  const handleChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleSaveProduct = async () => {
    try {
      if (editMode) {
        await axios.put(
          `${config.backendUrl}/api/productos/${currentProduct.id}`,
          currentProduct
        );
      } else {
        await axios.post(`${config.backendUrl}/api/productos`, currentProduct);
      }
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ p: 2 }}>
        Sistema de Gestión de Productos
      </Typography>

      <Box sx={{ display: "flex", gap: 2, padding: "10px" }}>
        <Button variant="contained" onClick={fetchProducts}>
          Cargar Productos
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleClickOpen()}
        >
          Crear Producto
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, padding: "10px" }}>
        <TextField
          label="Buscar Producto por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Button variant="contained" onClick={searchProductById}>
          Buscar
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, padding: "10px" }}>
        <TextField
          label="Eliminar Producto por ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <Button variant="contained" color="error" onClick={deleteProductById}>
          Eliminar
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tipo Producto</TableCell>
              <TableCell>Precio Unitario</TableCell>
              <TableCell>Coste Unitario</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.tipo_producto}</TableCell>
                <TableCell>{product.precio_unitario}</TableCell>
                <TableCell>{product.coste_unitario}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleClickOpen(product)}
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
        <DialogTitle>
          {editMode ? "Editar Producto" : "Añadir Producto"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="id"
            label="ID"
            value={currentProduct.id}
            onChange={handleChange}
            fullWidth
            disabled={editMode}
          />
          <TextField
            margin="dense"
            name="tipo_producto"
            label="Tipo Producto"
            value={currentProduct.tipo_producto}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="precio_unitario"
            label="Precio Unitario"
            value={currentProduct.precio_unitario}
            onChange={handleChange}
            fullWidth
            type="number"
          />
          <TextField
            margin="dense"
            name="coste_unitario"
            label="Coste Unitario"
            value={currentProduct.coste_unitario}
            onChange={handleChange}
            fullWidth
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSaveProduct}>
            {editMode ? "Actualizar" : "Añadir"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductList;
