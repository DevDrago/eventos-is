const actividadController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();

actividadController.crear = (req,res)=>{
    let actividad = req.body
    conexion.query("Insert into actividad (nombreActividad,idUsuario_fk,idEvento_fk,idCategoriaActividad_fk,fechaInicio,fechaFin,descripcion,noCupos) VALUES (?,?,?,?,STR_TO_DATE( ?, '%d-%m-%Y' ),STR_TO_DATE( ?, '%d-%m-%Y'),?,?)",[actividad.nombreActividad,actividad.usuario,actividad.evento,actividad.categoria,actividad.fechaInicio,actividad.fechaFin,actividad.descripcion,actividad.cupos],(error,result)=>{
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

actividadController.categorias = (req,res)=>{
    conexion.query("SELECT idCategoriaActividad,categoriaActividad FROM categoria_actividad",(error,categorias)=>{
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




module.exports = actividadController