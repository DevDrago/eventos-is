const mysql = require("mysql");
/*
{
    user:"siintech_is",
    host:"siintechn.com",
    password:"gwE(,ew$)@LF",
    database:"siintech_eventos"
}*/
//Configuracion para producción
module.exports = ()=>{
    return mysql.createPool({
        host: 'sql177.main-hosting.eu',
        user: 'u137828084_eventos',
        password:"eventos2020",
        database:"u137828084_eventos_is"
    });
}

/*module.exports = ()=>{
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:"",
        database:"eventos_is"
    });
}*/