const usuarioController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();
const bcrypt = require("bcrypt");

usuarioController.register = (req,res)=>{
    let usuario = req.body;
    conexion.query("Select numCuentaEmpleado from usuario where numCuentaEmpleado =? or correo =? ",[usuario.numCuentaEmpleado,usuario.correo],(error,usuarios)=>{
        if(error){
            return res.status(500).json({
                error,
                mensaje:"error en base de datos"
            })
        }
        if(usuarios.length>0){
            return res.status(400).json({
                mensaje:"usuario con numCuentaEmpleado existente"
            })
        }else{
            usuario.contrasenia = bcrypt.hashSync(usuario.contrasenia,10)
            conexion.query("Insert into usuario (idTipoUsuario_fk,numCuentaEmpleado,nombres,apellidos,correo,telefono,contrasenia) VALUES (?,?,?,?,?,?,?)",[usuario.tipoUsuario,usuario.numCuentaEmpleado,usuario.nombres,usuario.apellidos,usuario.correo,usuario.telefono,usuario.contrasenia],(error,result)=>{
                if(error){
                    return res.status(200).json({
                        error
                    })
                }
                if(result){
                    return res.status(200).json({
                        mensaje:"se ha creado un nuevo Usuario"
                    })
                }
            })
        }
    })
}

usuarioController.login = (req,res)=>{
    let usuario = req.body
    conexion.query("Select correo,contrasenia,idUsuario from usuario where correo =?",[usuario.correo],(error,usuarios,fields)=>{
        if(error){
            return res.status(500).json({
                mensaje:"error de servidor de base de datos",
                error
            })
        }
        if(usuarios.length==0){
            return res.status(404).json({
                mensaje:"no existe ningun usuario con este correo"
            })
        }else{
            let user = usuarios[0]
            if (!bcrypt.compareSync(usuario.contrasenia,user.contrasenia)){
                return res.status(403).json({
                    mensaje:"contrasenia incorrecta"
                })
            }else{
                req.session.idUusario = user.idUsuario;
                return res.status(200).json({
                    mensaje:"usuario logueado"
                })
            }
        }
    })
}

usuarioController.logout = (req,res)=>{
    req.session.destroy();
    return res.status(200).json({
        mensaje:'deslogueado'
    })
}

module.exports = usuarioController