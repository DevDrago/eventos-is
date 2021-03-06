const eventoController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();

eventoController.eventos = (req,res)=>{
    conexion.query(`SELECT idEvento,nombreEvento,CONCAT(nombres, ' ', apellidos) as usuario, date_format(fechaInicio, '%Y-%m-%d') fechaInicio, date_format(fechaInicio, '%d-%m-%Y') fechaInicioShow, date_format(fechaFin, '%Y-%m-%d') fechaFin, date_format(fechaFin, '%d-%m-%Y') fechaFinShow, idUsuario_fk
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
    
    conexion.query("Insert into evento (nombreEvento,idUsuario_fk,fechaInicio,fechaFin) VALUES (?,?,?,?)",[evento.nombreEvento,evento.idUsuario_fk,evento.fechaInicio,evento.fechaFin],(error,result)=>{
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

eventoController.actualizarEvento = (req,res)=>{
    let evento = req.body;
    conexion.query(`Update evento set nombreEvento = ?, idUsuario_fk =?,
                    fechaInicio = ?, fechaFin = ?
                    Where idEvento = ?`,
                    [evento.nombreEvento,evento.idUsuario_fk,evento.fechaInicio,evento.fechaFin, evento.idEvento],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error,
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Evento actualizado con éxito"
            })
        }
    })
}

eventoController.eliminarEvento = (req,res)=>{
    let evento = req.body;
    conexion.query(`Delete from evento Where idEvento = ?`, [evento.idEvento],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error,
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Evento eliminado con éxito"
            })
        }
    })
}

eventoController.countEvents = (req, res) => {
    conexion.query("SELECT COUNT(*) as eventsCount FROM evento", (error, eventsCount) => {
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos.",
                error
            })
        }
        let evCount = eventsCount[0].eventsCount
        return res.status(200).json({
            evCount
        })
    })
}


module.exports = eventoController