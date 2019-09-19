const express = require("express");
const app = express();

app.use(require("./eventos"));
app.use(require("./usuarios"));
app.use(require("./actividades"));


module.exports = app;