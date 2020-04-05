const actividadAsistenciaController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();

actividadAsistenciaController.countActAsis = (req, res) => {
    conexion.query("SELECT COUNT(*) as actsAsisCount FROM actividad_asistencia", (error, actsAsisCount) => {
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos.",
                error
            })
        }
        let acAsisCount = actsAsisCount[0].actsAsisCount
        return res.status(200).json({
            acAsisCount
        })
    })
}

actividadAsistenciaController.actividadAsistencia = (req, res)=> {
    conexion.query(`SELECT nombreActividad, CONCAT(nombres,' ',apellidos) as usuario, asistio, rutaDiploma, DATE_FORMAT(acas.fechaRegistro, "%d/%m/%Y") as fechaRegistro
    FROM actividad_asistencia acas inner join usuario on (idUsuario_fk = idUsuario)
    inner join actividad on (idActividad_fk = idActividad)`, (error, actividadasistencia)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            actividadasistencia
        })
    })
}

actividadAsistenciaController.crear = (req,res)=>{
    let actividadasistencia = req.body
    conexion.query("Insert into actividad_asistencia (idActividad_fk,idUsuario_fk,asistio,rutaDiploma) VALUES (?,?,?,?)",[actividadasistencia.actividad,actividadasistencia.usuario,actividadasistencia.asistio,actividadasistencia.rutaDiploma],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Se ha registrado la asistencia"
            })
        }
    })
}

actividadAsistenciaController.actualizarAsistenciaActividad = (req,res)=>{
    let actividadasistencia = req.body
    conexion.query(`Update actividad_asistencia set asistio = ?,rutaDiploma = ?
    where idActividad_fk = ? and idUsuario_fk = ?`,
    [actividadasistencia.asistio,actividadasistencia.rutaDiploma,actividadasistencia.actividad,actividadasistencia.usuario],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Se ha actualizado la asistencia"
            })
        }
    })
}

module.exports = actividadAsistenciaController
