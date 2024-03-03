'use strict';

import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Admin from './admin.model.js';

export const isAdmin = (req, res, next) => {
    const { role } = req.body;
    if (role !== "ADMIN_ROLE") {
        return res.status(403).json({ msg: "Acceso denegado. Solo los administradores pueden realizar esta acción." });
    }
    next();
};

export const getAdmins = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, admins] = await Promise.all([
        Admin.countDocuments(query),
        Admin.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        admins,
    });
}

export const createAdmin = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const admin = new Admin({ nombre, correo, password, role: "ADMIN_ROLE" });

    admin.role = 'ADMIN_ROLE';

    const salt = bcryptjs.genSaltSync();
    admin.password = bcryptjs.hashSync(password, salt);

    await admin.save();

    res.status(200).json({
        admin,
    });
}

export const getAdminById = async (req, res) => {
    const { id } = req.params;
    const admin = await Admin.findOne({ _id: id });

    res.status(200).json({
        admin,
    });
}
