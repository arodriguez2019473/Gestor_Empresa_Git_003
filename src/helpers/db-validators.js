import Admin from '../admin/admin.model.js';
import Role from '../roles/role.model.js';

export const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if (!existeRol){
        throw new Error(`El role ${role} no existe en la base datos`);
    }
}

export const existenteEmail = async (correo = '') => {
    const existeEmail = await Admin.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existeAdminById = async (id = '') => {
    const existeAdmin = await Admin.findById(id);

    if (!existeAdmin) {
        throw new Error(`El ID: ${id} No existe`);
    }
}