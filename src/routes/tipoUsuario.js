const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")
const  tipoUsuarioController = require("../controllers/tipoUsuarioController")


app.get("/usuarios/tipos", [verificarAutenticacion,verificarTipoUsuario], tipoUsuarioController.tipoUsuario)
app.get("/tipousuario/count", [verificarAutenticacion,verificarTipoUsuario], tipoUsuarioController.countTipoUsuario)
app.post("/tipousuario/crear",[verificarAutenticacion,verificarTipoUsuario],tipoUsuarioController.crear)
app.put("/tipousuario/actualizar", [verificarAutenticacion,verificarTipoUsuario],tipoUsuarioController.actualizarTipoUsuario)
app.post("/tipousuario/eliminar", [verificarAutenticacion,verificarTipoUsuario],tipoUsuarioController.eliminarTipoUsuario)

module.exports = app;