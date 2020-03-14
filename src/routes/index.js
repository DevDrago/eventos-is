const express = require("express");
const app = express();

app.use(require("./eventos"));
app.use(require("./usuarios"));
app.use(require("./actividades"));
app.use(require("./actividadAsistencia"));
app.use(require("./actividadResponsable"));
app.use(require("./categoriaActividad"));
app.use(require("./recursos"));
app.use(require("./tipoRecurso"));
app.use(require("./tipoUsuario"));


module.exports = app;