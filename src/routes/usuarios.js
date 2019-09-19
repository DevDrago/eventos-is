const express = require("express");
const app = express();
const usuarioController = require("../controllers/usuariosController.js")
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")

app.post("/usuarios/register",usuarioController.register)
app.post("/usuarios/login",usuarioController.login)
app.get("/usuarios/logout",verificarAutenticacion,usuarioController.logout)

module.exports = app;