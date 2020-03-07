const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")
const  actividadResponsableController = require("../controllers/actividadResponsableController")


app.get("/actividadresponsable", [verificarAutenticacion,verificarTipoUsuario], actividadResponsableController.actividadResponsable)
app.get("/actividadresponsable/actividades", [verificarAutenticacion,verificarTipoUsuario], actividadResponsableController.actividades)
app.post("/actividadresponsable/crear",[verificarAutenticacion,verificarTipoUsuario],actividadResponsableController.crear)
app.put("/actividadresponsable/actualizar", [verificarAutenticacion,verificarTipoUsuario],actividadResponsableController.actualizarResponsableActividad)

app.get("/actividadresponsable/count", [verificarAutenticacion,verificarTipoUsuario], actividadResponsableController.countActRes)
module.exports = app;