const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")
const  actividadAsistenciaController = require("../controllers/actividadAsistenciaController")


app.get("/actividadasistencia", actividadAsistenciaController.actividadAsistencia)
app.post("/actividadasistencia/crear",[verificarAutenticacion,verificarTipoUsuario],actividadAsistenciaController.crear)
app.put("/actividadasistencia/actualizar", [verificarAutenticacion,verificarTipoUsuario],actividadAsistenciaController.actualizarAsistenciaActividad)
/*app.delete("/actividades/eliminar", [verificarAutenticacion,verificarTipoUsuario],actividadAsistenciaController.eliminarActividad)*/

module.exports = app;