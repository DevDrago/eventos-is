const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")
const  tipoRecursoController = require("../controllers/tipoRecursoController")


app.get("/tiporecurso", tipoRecursoController.tipoRecurso)
app.post("/tiporecurso/crear",[verificarAutenticacion,verificarTipoUsuario],tipoRecursoController.crear)
app.put("/tiporecurso/actualizar", [verificarAutenticacion,verificarTipoUsuario],tipoRecursoController.actualizarTipoRecurso)
app.delete("/tiporecurso/eliminar", [verificarAutenticacion,verificarTipoUsuario],tipoRecursoController.eliminarTipoRecurso)

module.exports = app;