const express = require("express");
const app = express();

app.use(require("./eventos"));
app.use(require("./usuarios"));
app.use(require("./actividades"));
app.use(require("./actividadasistencia"));
app.use(require("./actividadresponsable"));


module.exports = app;