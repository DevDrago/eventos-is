const express = require("express");
const app = express();
const connection = require("./config/dbConnection")
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({secret:'123456',resave:true,saveUninitialized:true}))
app.use('/api', require("./routes/index"));

const conexion = connection();

conexion.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + conexion.threadId);
});

app.listen(3000);
