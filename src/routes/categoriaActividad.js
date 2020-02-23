const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const {verificarTipoUsuario} = require("../middlewares/verificarTipoUsuario")
const  categoriaActividadController = require("../controllers/categoriaActividadController")


app.get("/actividades/categorias", [verificarAutenticacion,verificarTipoUsuario], categoriaActividadController.categorias)
app.post("/actividadcategoria/crear",[verificarAutenticacion,verificarTipoUsuario],categoriaActividadController.crear)
app.put("/actividadcategoria/actualizar", [verificarAutenticacion,verificarTipoUsuario],categoriaActividadController.actualizarCategoriaActividad)
app.delete("/actividadcategoria/eliminar", [verificarAutenticacion,verificarTipoUsuario],categoriaActividadController.eliminarCategoriaActividad)

module.exports = app;