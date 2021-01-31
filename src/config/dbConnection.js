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
        host: 'sql437.main-hosting.eu',
        user: 'u476208749_eventos',
        password:"ev_2021IS",
        database:"u476208749_eventos_system"
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