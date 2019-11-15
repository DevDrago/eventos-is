const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")
const  recursosController = require("../controllers/recursosController")


app.get("/recursos", recursosController.recursos)
app.post("/recursos/crear",[verificarAutenticacion,verificarTipoUsuario],recursosController.crear)

module.exports = app;