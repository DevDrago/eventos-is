const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")
const  actividadAsistenciaController = require("../controllers/actividadAsistenciaController")


app.get("/actividadasistencia/count", actividadAsistenciaController.countActAsis)
app.get("/actividadasistencia", [verificarAutenticacion,verificarTipoUsuario], actividadAsistenciaController.actividadAsistencia)
app.get("/actividadasistencia/actividades", [verificarAutenticacion,verificarTipoUsuario], actividadAsistenciaController.actividades)
app.post("/actividadasistencia/crear",[verificarAutenticacion,verificarTipoUsuario],actividadAsistenciaController.crear)
app.post("/actividadasistencia/pdf",[verificarAutenticacion,verificarTipoUsuario],actividadAsistenciaController.pdf)
app.put("/actividadasistencia/actualizar", [verificarAutenticacion,verificarTipoUsuario],actividadAsistenciaController.actualizarAsistenciaActividad)

module.exports = app;