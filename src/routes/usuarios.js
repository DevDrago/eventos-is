const express = require("express");
const app = express();
const usuarioController = require("../controllers/usuariosController.js")
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")

app.post("/usuarios/register",usuarioController.register)
app.post("/usuarios/login",usuarioController.login)
app.get("/usuarios/logout",verificarAutenticacion,usuarioController.logout)
//app.get("/usuarios/tipos",usuarioController.tiposUsuario)

//Listas para selects
app.get("/usuarios/organizadores",usuarioController.getOrganizadores)
app.get("/usuarios/coordinadores",usuarioController.getCoordinadores)
app.get("/usuarios/apoyos",usuarioController.getApoyos)

module.exports = app;