const tipoUsuarioController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();

tipoUsuarioController.tipoUsuario = (req,res)=>{
    conexion.query("SELECT idTipoUsuario,tipoUsuario FROM tipo_usuario",(error,tiposUsuarios)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            tiposUsuarios
        })
    })
}

tipoUsuarioController.crear = (req,res)=>{
    let tipousuario = req.body
    conexion.query("Insert into tipo_usuario (tipoUsuario) VALUES (?)",[tipousuario.tipoUsuario],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Se ha registrado el tipo de usuario"
            })
        }
    })
}

tipoUsuarioController.actualizarTipoUsuario = (req,res)=>{
    let tipousuario = req.body
    conexion.query(`Update tipo_usuario set tipoUsuario = ?
    where idTipoUsuario = ?`,
    [tipousuario.tipoUsuario,tipousuario.idTipoUsuario],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje: "Error de servidor de base de datos",
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Se ha actualizado el tipo de usuario"
            })
        }
    })
}

tipoUsuarioController.eliminarTipoUsuario = (req,res)=>{
    let tipousuario = req.body
    conexion.query(`Delete from tipo_usuario Where idTipoUsuario = ?`,[tipousuario.idTipoUsuario],(error,result)=>{
        if(error){
            mensaje = (error.code == "ER_ROW_IS_REFERENCED_2") ? "El tipo de usuario no se puede eliminar porque tiene usuarios asociados" : "Error de servidor de base de datos"
            return res.status(500).json({
                mensaje: mensaje,
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Tipo de usuario eliminado con éxito"
            })
        }
    })
}

tipoUsuarioController.countTipoUsuario = (req, res) => {
    conexion.query("SELECT COUNT(*) as countTipoUsuario FROM tipo_usuario", (error, countTipoUsuario) => {
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos.",
                error
            })
        }
        let tipoUsCount = countTipoUsuario[0].countTipoUsuario
        return res.status(200).json({
            tipoUsCount
        })
    })
}

module.exports = tipoUsuarioController