import bcryptjs from 'bcryptjs';
import Admin from '../admin/admin.model.js';
import { generarJWT } from '../helpers/generar-jwt.js';

export const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        
        const admin = await Admin.findOne({ correo });
        
        if (!admin) {
            return res.status(400).json({
                msg: "Credenciales incorrectas, Correo no existe en la base de datos"
            });
        }
        
        if (!admin.estado) {
            return res.status(400).json({
                msg: "El usuario no existe en la base de datos"
            });
        }
        
        const validarPassword = bcryptjs.compareSync(password, admin.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        }

        const token = await generarJWT(admin.id);

        res.status(200).json({
            msg: '¡Login OK!',
            admin,
            token
        });
    } 

    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuníquese con el administrador"
        });
    }
}
