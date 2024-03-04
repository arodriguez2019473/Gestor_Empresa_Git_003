import jwt from "jsonwebtoken";
import Admin from '../admin/admin.model.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token de petición",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const admin = await Admin.findById(uid);

        if (!admin) {
            return res.status(401).json({
                msg: 'Admin no existe en la base de datos'
            })
        }

        if (!admin.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario en estado false'
            })
        }

        if (admin.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                msg: 'Unauthorized access - Role not allowed'
            });
        }

        req.admin = admin;
        next();

    } catch (e) {
        console.log(e)
        res.status(401).json({
            msg: "Token no válido",
        });
    }
}
