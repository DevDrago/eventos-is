const tipoRecursoController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();

tipoRecursoController.tipoRecurso = (req,res)=>{
    conexion.query("SELECT idTipoRecurso,tipoRecurso FROM tipo_recurso",(error,tipoRecurso)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            tipoRecurso
        })
    })
}

tipoRecursoController.crear = (req,res)=>{
    let tiporecurso = req.body
    conexion.query("Insert into tipo_recurso (tipoRecurso) VALUES (?)",[tiporecurso.tipoRecurso],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Se ha registrado el tipo de recurso"
            })
        }
    })
}

tipoRecursoController.actualizarTipoRecurso = (req,res)=>{
    let tiporecurso = req.body
    conexion.query(`Update tipo_recurso set tipoRecurso = ?
    where idTipoRecurso = ?`,
    [tiporecurso.tipoRecurso,tiporecurso.idTipoRecurso],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje: "Error de servidor de base de datos",
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Se ha actualizado el tipo de recurso"
            })
        }
    })
}

tipoRecursoController.eliminarTipoRecurso = (req,res)=>{
    let tiporecurso = req.body
    conexion.query(`Delete from tipo_recurso Where idTipoRecurso = ?`,[tiporecurso.idTipoRecurso],(error,result)=>{
        if(error){
            mensaje = (error.code == "ER_ROW_IS_REFERENCED_2") ? "El tipo de recurso no se puede eliminar porque tiene recursos asociados" : "Error de servidor de base de datos"
            return res.status(500).json({
                mensaje: mensaje,
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Tipo de recurso eliminado con éxito"
            })
        }
    })
}

tipoRecursoController.countTipoRecurso = (req, res) => {
    conexion.query("SELECT COUNT(*) as countTipoRecurso FROM tipo_recurso", (error, countTipoRecurso) => {
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos.",
                error
            })
        }
        let tipoRecCount = countTipoRecurso[0].countTipoRecurso
        return res.status(200).json({
            tipoRecCount
        })
    })
}

module.exports = tipoRecursoController