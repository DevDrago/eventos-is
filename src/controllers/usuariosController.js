const usuarioController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('../config');

usuarioController.register = (req,res)=>{
    let usuario = req.body;
    conexion.query("Select numCuentaEmpleado from usuario where numCuentaEmpleado =? or correo =? ",[usuario.numCuentaEmpleado,usuario.correo],(error,usuarios)=>{
        if(error){
            return res.status(500).json({
                error,
                mensaje:"Error en base de datos"
            })
        }
        if(usuarios.length>0){
            return res.status(400).json({
                mensaje:"Usuario con número de cuenta/empleado o correo existente"
            })
        }else{
            usuario.contrasenia = bcrypt.hashSync(usuario.contrasenia,10)
            conexion.query("Insert into usuario (idTipoUsuario_fk,numCuentaEmpleado,nombres,apellidos,correo,telefono,contrasenia) VALUES (?,?,?,?,?,?,?)",[usuario.tipoUsuario,usuario.numCuentaEmpleado,usuario.nombres,usuario.apellidos,usuario.correo,usuario.telefono,usuario.contrasenia],(error,result)=>{
                if(error){
                    return res.status(500).json({
                        error
                    })
                }
                if(result){
                    conexion.query("Select idUsuario, idTipoUsuario_fk as tipoUsuario, numCuentaEmpleado, nombres, apellidos, correo, telefono from usuario where idUsuario = ?",
                    [result.insertId],(error, usuarioRegistrado)=>{
                        if(error){
                            return res.status(500).json({error, mensaje:"Error al obtener el usuario registrado"});
                        }
                        if(usuarioRegistrado){
                            let token = jwt.sign({ id: result.insertId }, config.secret, {expiresIn: 86400});
                            res.status(200).json({ auth: true, token: token, user: usuarioRegistrado[0], mensaje:"Se ha creado un nuevo Usuario" });
                        }
                    })
                }
            })
        }
    })
}

usuarioController.login = (req,res)=>{
    let usuario = req.body
    conexion.query("Select nombres, apellidos, telefono, correo,contrasenia,idUsuario,idTipoUsuario_fk as tipoUsuario from usuario where correo =?",[usuario.correo],(error,usuarios,fields)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        if(usuarios.length==0){
            return res.status(404).json({
                auth:false,
                token:null,
                mensaje:"No existe ningún usuario con este correo"
            })
        }else{
            let user = usuarios[0]
            if (!bcrypt.compareSync(usuario.contrasenia,user.contrasenia)){
                return res.status(403).json({
                    auth:false,
                    token:null,
                    mensaje:"Contrasenia incorrecta"
                })
            }else{
                req.session.idUusario = user.idUsuario;
                req.session.tipoUsuario = user.tipoUsuario;
                let token = jwt.sign({ id: usuarios.idUsuario }, config.secret, { expiresIn: 86400});
                return res.status(200).json({
                    auth: true, token: token, user: user,
                    mensaje:"Usuario logueado"
                })
            }
        }
    })
}

usuarioController.logout = (req,res)=>{
    req.session.destroy();
    return res.status(200).json({
        mensaje:'Deslogueado'
    })
}

usuarioController.tiposUsuario =(req,res)=>{
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

//Listas para selects
usuarioController.getOrganizadores = (req,res) => {
    conexion.query("SELECT idUsuario, CONCAT(nombres,' ',apellidos) as organizador FROM usuario where idTipoUsuario_fk = 2",(error,organizadores)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            organizadores
        })
    })   
}
usuarioController.getCoordinadores = (req,res) => {
    conexion.query("SELECT idUsuario, CONCAT(nombres,' ',apellidos) as coordinador FROM usuario where idTipoUsuario_fk = 3",(error,coordinadores)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            coordinadores
        })
    })   
}
usuarioController.getApoyos = (req,res) => {
    conexion.query("SELECT idUsuario, CONCAT(nombres,' ',apellidos) as apoyo FROM usuario where idTipoUsuario_fk = 4",(error,apoyos)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            apoyos
        })
    })   
}

module.exports = usuarioController