const eventoController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();

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