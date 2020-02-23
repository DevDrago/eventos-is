const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")
const  tipoUsuarioController = require("../controllers/tipoUsuarioController")


app.get("/usuarios/tipos", [verificarAutenticacion,verificarTipoUsuario], tipoUsuarioController.tipoUsuario)
app.post("/tipousuario/crear",[verificarAutenticacion,verificarTipoUsuario],tipoUsuarioController.crear)
app.put("/tipousuario/actualizar", [verificarAutenticacion,verificarTipoUsuario],tipoUsuarioController.actualizarTipoUsuario)
app.delete("/tipousuario/eliminar", [verificarAutenticacion,verificarTipoUsuario],tipoUsuarioController.eliminarTipoUsuario)

module.exports = app;