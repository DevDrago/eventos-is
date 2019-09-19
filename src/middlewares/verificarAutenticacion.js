let verificarAutenticacion = (req,res,next) => {
    if(req.session.idUusario) {
        return next();
    } else {
        res.status(401).json({
            mensaje:'Acceso no autorizado'
        })
    }
}

module.exports ={
    verificarAutenticacion
}