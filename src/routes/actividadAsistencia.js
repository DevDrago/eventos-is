const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")
const  actividadAsistenciaController = require("../controllers/actividadAsistenciaController")

app.get('/', function(req, res) {
    res.send('hello world');
  });
app.get("/actividadasistencia", [verificarAutenticacion,verificarTipoUsuario], actividadAsistenciaController.actividadAsistencia)
app.post("/actividadasistencia/crear",[verificarAutenticacion,verificarTipoUsuario],actividadAsistenciaController.crear)
app.put("/actividadasistencia/actualizar", [verificarAutenticacion,verificarTipoUsuario],actividadAsistenciaController.actualizarAsistenciaActividad)

module.exports = app;