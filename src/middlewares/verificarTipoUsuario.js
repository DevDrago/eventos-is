let verificarTipoUsuario = (req,res,next) => {
    if(req.session.tipoUsuario==1 || req.session.tipoUsuario ==2 || req.session.tipoUsuario==3) {
        return next();
    } else {
        res.status(401).json({
            mensaje:'Acceso no autorizado'
        })
    }
}

module.exports ={
    verificarTipoUsuario
}