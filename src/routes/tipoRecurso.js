const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")
const  tipoRecursoController = require("../controllers/tipoRecursoController")


app.get("/tiporecurso/count", [verificarAutenticacion,verificarTipoUsuario], tipoRecursoController.countTipoRecurso)
app.get("/tiporecurso", [verificarAutenticacion,verificarTipoUsuario], tipoRecursoController.tipoRecurso)
app.post("/tiporecurso/crear",[verificarAutenticacion,verificarTipoUsuario],tipoRecursoController.crear)
app.put("/tiporecurso/actualizar", [verificarAutenticacion,verificarTipoUsuario],tipoRecursoController.actualizarTipoRecurso)
app.post("/tiporecurso/eliminar", [verificarAutenticacion,verificarTipoUsuario],tipoRecursoController.eliminarTipoRecurso)

module.exports = app;