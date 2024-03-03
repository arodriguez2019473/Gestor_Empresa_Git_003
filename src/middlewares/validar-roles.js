export const tieneRol = (...roles) => {
    return (req,res,next) => {
        if(!req.admin){
            return res.status(500).json({
                msg: 'Se quiere verificar un rol sin validar el token primero'
            })
        }

        if(!roles.includes(req.admin.role)){
            return res.status(401).json({
                msg: `Usuario no autorizado, posee un rol ${req.usuario.role}, los roles autorizado son ${ roles }`
            })
        }
        next();
    }
}