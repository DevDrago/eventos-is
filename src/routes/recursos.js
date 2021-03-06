const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")
const  recursosController = require("../controllers/recursosController")


app.get("/recursos/count", [verificarAutenticacion,verificarTipoUsuario], recursosController.countRecurso)
app.get("/recursos/tipos", [verificarAutenticacion,verificarTipoUsuario], recursosController.tipoRecurso)
app.get("/recursos", [verificarAutenticacion,verificarTipoUsuario], recursosController.recursos)
app.post("/recursos/crear",[verificarAutenticacion,verificarTipoUsuario],recursosController.crear)

module.exports = app;