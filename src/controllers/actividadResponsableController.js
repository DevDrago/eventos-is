const actividadResponsableController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();

actividadResponsableController.actividadResponsable = (req, res)=> {
    conexion.query(`SELECT nombreActividad, nombres, trabajoRealizado, totalHoras, 
    acres.estado, DATE_FORMAT(acres.fechaRegistro, "%d/%m/%Y") as fechaRegistro,
    acres.idActividad_fk, acres.idUsuario_fk
    FROM actividad_responsable acres inner join usuario on (idUsuario_fk = idUsuario)
    inner join actividad on (idActividad_fk = idActividad)`, (error, actividadresponsable)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            actividadresponsable
        })
    })
}

actividadResponsableController.crear = (req,res)=>{
    let actividadresponsable = req.body
    conexion.query("Insert into actividad_responsable (idActividad_fk,idUsuario_fk,trabajoRealizado,totalHoras,estado) VALUES (?,?,?,?,?)",[actividadresponsable.actividad,actividadresponsable.usuario,actividadresponsable.trabajoRealizado,actividadresponsable.totalHoras,actividadresponsable.estado],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Se ha registrado al usuario responsable de la actividad"
            })
        }
    })
}

actividadResponsableController.actualizarResponsableActividad = (req,res)=>{
    let actividresponsable = req.body
    conexion.query(`Update actividad_responsable set trabajoRealizado = ?,totalHoras = ?, estado= ?
    where idActividad_fk = ? and idUsuario_fk = ?`,
    [actividresponsable.trabajoRealizado,actividresponsable.totalHoras,actividresponsable.estado,actividresponsable.actividad,actividresponsable.usuario],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Se han actualizado los datos"
            })
        }
    })
}

actividadResponsableController.countActRes = (req, res) => {
    conexion.query("SELECT COUNT(*) as actResCount FROM actividad_responsable", (error, actResCount) => {
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos.",
                error
            })
        }
        let acResCount = actResCount[0].actResCount
        return res.status(200).json({
            acResCount
        })
    })
}

module.exports = actividadResponsableController