const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")
const  actividadesController = require("../controllers/actividadesController")


app.get("/actividades", actividadesController.actividades)
app.post("/actividades/crear",[verificarAutenticacion,verificarTipoUsuario],actividadesController.crear)
app.put("/actividades/actualizar", [verificarAutenticacion,verificarTipoUsuario],actividadesController.actualizarActividad)
app.delete("/actividades/eliminar", [verificarAutenticacion,verificarTipoUsuario],actividadesController.eliminarActividad)

app.get("/actividades/count", actividadesController.countActs)
//app.get("/actividades/categorias",actividadesController.categorias)

module.exports = app;