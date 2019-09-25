const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")

const eventosController = require("../controllers/eventoController.js");

app.get("/eventos",eventosController.eventos)
app.post("/eventos/crear",[verificarAutenticacion,verificarTipoUsuario],eventosController.crear)
app.put("/eventos/actualizar",[verificarAutenticacion,verificarTipoUsuario],eventosController.actualizarEvento)
app.delete("/eventos/eliminar",[verificarAutenticacion,verificarTipoUsuario],eventosController.eliminarEvento)

module.exports = app;
