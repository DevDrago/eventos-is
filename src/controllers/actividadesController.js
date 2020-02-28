const actividadController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();


actividadController.actividades = (req,res)=>{
    conexion.query(`SELECT idActividad,nombreActividad,nombres as usuario, act.idUsuario_fk, act.idCategoriaActividad_fk,
                    act.idEvento_fk, nombreEvento, categoriaActividad, DATE_FORMAT(act.fechaInicio, "%d/%m/%Y") as fechaInicio, DATE_FORMAT(act.fechaFin, "%d/%m/%Y") as fechaFin,
                    descripcion, noCupos, CASE WHEN act.estado = '1' THEN 'Activo' ELSE 'Inactivo' END AS estado 
                    FROM actividad act inner join usuario on (idUsuario_fk = idUsuario)
                    inner join evento on (act.idEvento_fk = idEvento)
                    inner join categoria_actividad on (idCategoriaActividad_fk = idCategoriaActividad)`,(error,actividades)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            actividades
        })
    })
}

actividadController.crear = (req,res)=>{
    let actividad = req.body
    conexion.query("Insert into actividad (nombreActividad,idUsuario_fk,idEvento_fk,idCategoriaActividad_fk,fechaInicio,fechaFin,descripcion,noCupos) VALUES (?,?,?,?,STR_TO_DATE( ?, '%d-%m-%Y' ),STR_TO_DATE( ?, '%d-%m-%Y'),?,?)",[actividad.nombreActividad,actividad.idUsuario_fk,actividad.idEvento_fk,actividad.idCategoriaActividad_fk,actividad.fechaInicio,actividad.fechaFin,actividad.descripcion,actividad.noCupo],(error,result)=>{
        if(error){
            return res.status(500).json({
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"se ha creado una nueva actividad"
            })
        }
    })
}

actividadController.actualizarActividad = (req,res)=>{
    let actividad = req.body
    conexion.query(`Update actividad set nombreActividad = ?,idUsuario_fk = ?,
                    idEvento_fk = ?, idCategoriaActividad_fk = ?,
                    fechaInicio = STR_TO_DATE( ?, '%d-%m-%Y' ), fechaFin = STR_TO_DATE( ?, '%d-%m-%Y' ), 
                    descripcion = ?, noCupos = ? Where idActividad = ?`,
                    [actividad.nombreActividad,actividad.usuario,actividad.evento,actividad.categoria,actividad.fechaInicio,actividad.fechaFin,actividad.descripcion,actividad.cupos,actividad.idActividad],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Actividad actualizada con éxito"
            })
        }
    })
}

actividadController.eliminarActividad = (req,res)=>{
    let actividad = req.body
    conexion.query(`Delete from actividad Where idActividad = ?`,[actividad.idActividad],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Actividad eliminada con éxito"
            })
        }
    })
}

actividadController.categorias = (req,res)=>{
    conexion.query("SELECT idCategoriaActividad as value,categoriaActividad as text FROM categoria_actividad",(error,categorias)=>{
        if(error){
            return res.status(500).json({
                mensaje:"error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            categorias
        })
    })
}

actividadController.eventos = (req,res)=>{
    conexion.query("SELECT idEvento as value,nombreEvento as text FROM evento",(error,eventos)=>{
        if(error){
            return res.status(500).json({
                mensaje:"error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            eventos
        })
    })
}

actividadController.countActs = (req, res) => {
    conexion.query("SELECT COUNT(*) as actsCount FROM actividad", (error, actsCount) => {
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos.",
                error
            })
        }
        let acCount = actsCount[0].actsCount
        return res.status(200).json({
            acCount
        })
    })
}




module.exports = actividadController