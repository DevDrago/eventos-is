const actividadAsistenciaController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();
const uploadDiploma = require('../uploadDiploma.js')

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
    conexion.query(`SELECT nombreActividad, acas.idActividad_fk, acas.idUsuario_fk, CONCAT(nombres,' ',apellidos) as usuario, 
    CASE asistio WHEN '0' THEN false ELSE true END as asistio, CASE asistio WHEN '0' THEN 'No' ELSE 'Sí' END as asistioText,
    rutaDiploma as diploma, DATE_FORMAT(acas.fechaRegistro, "%d/%m/%Y") as fechaRegistro
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
    let actividadasistencia = req.body[0];
    let generateDiploma = req.body[1];
    let asistio = actividadasistencia.asistio == true ? '1' : '0';
    conexion.query("Insert into actividad_asistencia (idActividad_fk,idUsuario_fk,asistio) VALUES (?,?,?)",
    [actividadasistencia.idActividad_fk,actividadasistencia.idUsuario_fk,asistio],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        if(result){
            if(generateDiploma && asistio==='1'){
                conexion.query(`SELECT idActividad as idActividad_fk, idUsuario as idUsuario_fk, nombreActividad, CONCAT(nombres,' ',apellidos) as usuario
                FROM actividad_asistencia acas inner join usuario on (idUsuario_fk = idUsuario)
                inner join actividad on (idActividad_fk = idActividad)
                where idActividad = ? and idUsuario = ?`,[actividadasistencia.idActividad_fk,actividadasistencia.idUsuario_fk], (error, pdfData)=>{
                    if(result){
                        uploadDiploma.upload(pdfData[0]).then(() => {
                            return res.status(200).json({
                                mensaje:"PDF generado exitosamente"
                            })
                        }).catch(error => {
                            return res.status(500).json({
                                mensaje:"error de servidor de base de datos",
                                error
                            })
                        });

                    }else{
                        return res.status(500).json({
                            mensaje:"Error de servidor de base de datos",
                            error
                        })
                    }
                })
            }else{
                return res.status(200).json({
                    mensaje:"Se ha registrado la asistencia"
                })
            }
            
        }
    })
}

actividadAsistenciaController.actualizarAsistenciaActividad = (req,res)=>{
    let actividadasistencia = req.body
    let asistio = actividadasistencia.asistio == true ? '1' : '0';
    conexion.query(`Update actividad_asistencia set asistio = ?
    where idActividad_fk = ? and idUsuario_fk = ?`,
    [asistio,actividadasistencia.idActividad_fk,actividadasistencia.idUsuario_fk],(error,result)=>{
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

actividadAsistenciaController.actividades = (req,res)=>{
    conexion.query("SELECT idActividad as value,nombreActividad as text FROM actividad",(error,actAsis)=>{
        if(error){
            return res.status(500).json({
                mensaje:"error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            actAsis
        })
    })
}

actividadAsistenciaController.pdf = (req,res)=>{
    let pdfData = req.body;
    uploadDiploma.upload(pdfData).then(() => {
        return res.status(200).json({
            mensaje:"PDF generado exitosamente"
        })
    }).catch(error => {
        return res.status(500).json({
            mensaje:"error de servidor de base de datos",
            error
        })
    });
}

module.exports = actividadAsistenciaController
