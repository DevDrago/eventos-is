const categoriaActividadController = {}
const connection= require("../config/dbConnection.js")
const conexion = connection();

categoriaActividadController.categorias = (req,res)=>{
    conexion.query("SELECT idCategoriaActividad,categoriaActividad FROM categoria_actividad",(error,categorias)=>{
        if(error){
            return res.status(500).json({
                mensaje:"error de servidor de base de datos",
                error
            })
        }
        return res.status(200).json({
            categorias
        })
    })
}

categoriaActividadController.crear = (req,res)=>{
    let categoriaactividad = req.body
    conexion.query("Insert into categoria_actividad (categoriaActividad) VALUES (?)",[categoriaactividad.nombreCategoria],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos",
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Se ha registrado la categoría"
            })
        }
    })
}

categoriaActividadController.actualizarCategoriaActividad = (req,res)=>{
    let categoriaactividad = req.body
    conexion.query(`Update categoria_actividad set categoriaActividad = ?
    where idCategoriaActividad = ?`,
    [categoriaactividad.nombreCategoria,categoriaactividad.idCategoriaActividad],(error,result)=>{
        if(error){
            return res.status(500).json({
                mensaje: "Error de servidor de base de datos",
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Se ha actualizado la categoría"
            })
        }
    })
}

categoriaActividadController.eliminarCategoriaActividad = (req,res)=>{
    let categoriaactividad = req.body
    conexion.query(`Delete from categoria_actividad Where idCategoriaActividad = ?`,[categoriaactividad.idCategoriaActividad],(error,result)=>{
        if(error){
            mensaje = (error.code == "ER_ROW_IS_REFERENCED_2") ? "La categoria no se puede eliminar porque tiene actividades asociadas" : "Error de servidor de base de datos"
            return res.status(500).json({
                mensaje: mensaje,
                error
            })
        }
        if(result){
            return res.status(200).json({
                mensaje:"Categoria eliminada con éxito"
            })
        }
    })
}

categoriaActividadController.actCatCount = (req, res) => {
    conexion.query("SELECT COUNT(*) as actCatCount FROM categoria_actividad", (error, actCatCount) => {
        if(error){
            return res.status(500).json({
                mensaje:"Error de servidor de base de datos.",
                error
            })
        }
        let acCatCount = actCatCount[0].actCatCount
        return res.status(200).json({
            acCatCount
        })
    })
}

module.exports = categoriaActividadController