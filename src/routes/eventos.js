const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")


const eventosController = require("../controllers/eventoController.js");

app.post("/eventos/crear",verificarAutenticacion,eventosController.crear)

module.exports = app;
