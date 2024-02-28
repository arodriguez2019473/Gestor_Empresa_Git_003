import Admin from '../admin/admin.model.js';

export const existenteEmail = async (correo = '') => {
    // Buscar el usuario por correo electrónico
    const existeEmail = await Admin.findOne({ correo });

    // Si el correo ya está registrado, lanzar un error
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