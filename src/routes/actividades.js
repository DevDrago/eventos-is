const express = require("express");
const app = express();
const {verificarAutenticacion} = require("../middlewares/verificarAutenticacion.js")
const  actividadesController = require("../controllers/actividadesController")


app.post("/actividades/crear",actividadesController.crear)

module.exports = app;