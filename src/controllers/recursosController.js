const recursosController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();

recursosController.recursos = (req, res)=> {
    conexion.query(`SELECT nombreActividad, tipoRecurso, DATE_FORMAT(rec.fechaRegistro, "%d/%m/%Y") as fechaRegistro
    FROM recurso rec inner join tipo_recurso on (idTipoRecurso_fk = idTipoRecurso)
    inner join actividad on (idActividad_fk = idActividad)`, (error, recursos)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            recursos
        })
    })
}

recursosController.crear = (req,res)=>{
    let recursos = req.body
    conexion.query("Insert into recurso (idActividad_fk,idTipoRecurso_fk) VALUES (?,?)",[recursos.actividad,recursos.tipoRecurso],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Se ha registrado el recurso"
            })
        }
    })
}

module.exports = recursosController