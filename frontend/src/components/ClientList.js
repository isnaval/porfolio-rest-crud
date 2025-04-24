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

function ClientList() {
  const [clients, setClients] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentClient, setCurrentClient] = useState({
    id_cliente: "",
    cliente: "",
    zona: "",
    pais: "",
  });

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/api/clientes`);
      setClients(response.data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  const searchClientById = async () => {
    if (!searchId) {
      alert("Ingresa un ID para buscar.");
      return;
    }
    try {
      const response = await axios.get(
        `${config.backendUrl}/api/clientes/${searchId}`
      );
      setClients([response.data]);
    } catch (error) {
      console.error("Error al buscar cliente:", error);
    }
  };

  const deleteClientById = async () => {
    if (!deleteId) {
      alert("Ingresa un ID para eliminar.");
      return;
    }
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar el cliente con ID ${deleteId}?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${config.backendUrl}/api/clientes/${deleteId}`);
        fetchClients();
        setDeleteId("");
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
      }
    }
  };

  const handleClickOpen = (
    client = {
      id_cliente: "",
      cliente: "",
      zona: "",
      pais: "",
    }
  ) => {
    setCurrentClient(client);
    setEditMode(!!client.id_cliente);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentClient({
      id_cliente: "",
      cliente: "",
      zona: "",
      pais: "",
    });
  };

  const handleChange = (e) => {
    setCurrentClient({ ...currentClient, [e.target.name]: e.target.value });
  };

  const handleSaveClient = async () => {
    try {
      if (editMode) {
        await axios.put(
          `${config.backendUrl}/api/clientes/${currentClient.id_cliente}`,
          currentClient
        );
      } else {
        await axios.post(`${config.backendUrl}/api/clientes`, currentClient);
      }
      fetchClients();
      handleClose();
    } catch (error) {
      console.error("Error al guardar cliente:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ p: 2 }}>
        Sistema de Gestión de Clientes
      </Typography>

      <Box sx={{ display: "flex", gap: 2, padding: "10px" }}>
        <Button variant="contained" onClick={fetchClients}>
          Cargar Clientes
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleClickOpen()}
        >
          Crear Cliente
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, padding: "10px" }}>
        <TextField
          label="Buscar Cliente por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Button variant="contained" onClick={searchClientById}>
          Buscar
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, padding: "10px" }}>
        <TextField
          label="Eliminar Cliente por ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <Button variant="contained" color="error" onClick={deleteClientById}>
          Eliminar
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Zona</TableCell>
              <TableCell>País</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id_cliente}>
                <TableCell>{client.id_cliente}</TableCell>
                <TableCell>{client.cliente}</TableCell>
                <TableCell>{client.zona}</TableCell>
                <TableCell>{client.pais}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleClickOpen(client)}
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
          {editMode ? "Editar Cliente" : "Añadir Cliente"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="id_cliente"
            label="ID"
            value={currentClient.id_cliente}
            onChange={handleChange}
            fullWidth
            disabled={editMode}
          />
          <TextField
            margin="dense"
            name="cliente"
            label="Cliente"
            value={currentClient.cliente}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="zona"
            label="Zona"
            value={currentClient.zona}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="pais"
            label="País"
            value={currentClient.pais}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSaveClient}>
            {editMode ? "Actualizar" : "Añadir"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ClientList;
