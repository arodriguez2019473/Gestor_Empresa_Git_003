import bcryptjs from 'bcryptjs';
import Admin from '../admin/admin.model';
import { generarJWT } from '../helpers/generar-jwt';

export const login =  async (req, res) => {
    const { correo, password } = req.body;

    try {
        
        const admin = await Admin.findOne({ correo });
        
        if (!admin.estado) {
            return res.status(400).json({
                msg: "The user does not exist in the database"
            });
        }
        
        const validarPassword = bcryptjs.compareSync( password, admin.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg:"the password has been incorrect"
            });
        }

        const token = await generarJWT( admin.id);

        res.status(200).json({
            msg: 'Login OK!!',
            admin,
            token
        });
    } 

    catch (e) {

        console.log(e);
        res.status(500).json({
            msg: "Contact administrator",
        });

    }
}