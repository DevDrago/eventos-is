const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")

const eventosController = require("../controllers/eventoController.js");

app.post("/eventos/crear",[verificarAutenticacion,verificarTipoUsuario],eventosController.crear)

module.exports = app;
