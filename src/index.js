const express = require("express");
const app = express();
const connection = require("./config/dbConnection")
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

// CORS 
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://eventos-is.xibalbahn.com/');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({secret:'123456',resave:true,saveUninitialized:true}))
app.use('/api', require("./routes/index"));
app.get('/', function(req, res) {
  res.send('Segundo deploy en Heroku funcionando');
});

const conexion = connection();

//Configuracion para producción
conexion.getConnection(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + conexion.threadId);
});

/*conexion.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + conexion.threadId);
});*/

app.listen(process.env.PORT || 3000);
