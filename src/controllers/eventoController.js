const eventoController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();

eventoController.eventos = (req,res)=>{
    conexion.query(`SELECT idEvento,nombreEvento,nombres as usuario,fechaInicio,fechaFin 
                    FROM evento inner join usuario on (idUsuario_fk = idUsuario)`,(error,eventos)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            eventos
        })
    })
}

eventoController.crear = (req,res)=>{
    let evento = req.body;
    conexion.query("Insert into evento (nombreEvento,idUsuario_fk,fechaInicio,fechaFin) VALUES (?,?,STR_TO_DATE( ?, '%d-%m-%Y' ),STR_TO_DATE( ?, '%d-%m-%Y'))",[evento.nombreEvento,req.session.idUusario,evento.fechaInicio,evento.fechaFinal],(error,result)=>{
        if(error){
            return res.status(500).json({
                error,
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"se ha creado un nuevo evento"
            })
        }
    })
}


module.exports = eventoController