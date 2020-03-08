const express = require("express");
const app = express();
const usuarioController = require("../controllers/usuariosController.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")

app.get("/usuarios",[verificarAutenticacion,verificarTipoUsuario],usuarioController.usuarios)
app.post("/usuarios/register",usuarioController.register)
app.post("/usuarios/login",usuarioController.login)
app.get("/usuarios/logout",verificarAutenticacion,usuarioController.logout)
//app.get("/usuarios/tipos",usuarioController.tiposUsuario)

//Listas para selects
app.get("/usuarios/organizadores", [verificarAutenticacion,verificarTipoUsuario],usuarioController.getOrganizadores)
app.get("/usuarios/coordinadores",[verificarAutenticacion,verificarTipoUsuario],usuarioController.getCoordinadores)
app.get("/usuarios/apoyos",[verificarAutenticacion,verificarTipoUsuario],usuarioController.getApoyos)
app.get("/usuarios/apoyoscoor",[verificarAutenticacion,verificarTipoUsuario],usuarioController.getApoyosCoordinadores)

app.get("/usuarios/count", [verificarAutenticacion,verificarTipoUsuario], usuarioController.countUsers)

module.exports = app;