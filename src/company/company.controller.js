import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { response, request } from "express";

import ExcelJS from 'exceljs';
import path from 'path';
import Company from './company.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addCompany = async (req, res) => {
    const { nombre, categoriaEmpresarial, nivelImpacto, añosTrayectoria, datosClaves, correo } = req.body;

    try {
        const existingCompany = await Company.findOne({ correo });

        if (existingCompany) {
            return res.status(400).json({ message: "Company with this email already exists" });
        }

        const newCompany = new Company({
            nombre,
            categoriaEmpresarial,
            nivelImpacto,
            añosTrayectoria,
            datosClaves,
            correo,
            role: "COMP_ROLE",
        });

        await newCompany.save();

        res.status(201).json({ company: newCompany });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const viewCompanies = async (req, res) => {
    try {
        let { sortBy, sortOrder } = req.query;

        if (!sortBy) sortBy = "nombre";
        if (!sortOrder) sortOrder = "asc";

        const companies = await Company.find().sort({ [sortBy]: sortOrder });

        res.status(200).json({ companies });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const editCompany = async (req, res) => {
    const { id } = req.params;
    const { nombre, categoriaEmpresarial, nivelImpacto, añosTrayectoria, datosClaves } = req.body;

    try {
        const updatedCompany = await Company.findByIdAndUpdate(id, {
            nombre,
            categoriaEmpresarial,
            nivelImpacto,
            añosTrayectoria,
            datosClaves,
        }, { new: true });

        res.status(200).json({ company: updatedCompany });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const generateReport = async (req, res) => {
    try {
        const companies = await Company.find();

        const workbook = new ExcelJS.Workbook(); // Utilizar la variable workbook definida a nivel de archivo
        const worksheet = workbook.addWorksheet('Empresas');
        worksheet.columns = [
            { header: 'Nombre', key: 'nombre', width: 20 },
            { header: 'Categoría Empresarial', key: 'categoriaEmpresarial', width: 20 },
            { header: 'Nivel de Impacto', key: 'nivelImpacto', width: 20 },
            { header: 'Años de Trayectoria', key: 'añosTrayectoria', width: 20 },
            { header: 'Datos Claves', key: 'datosClaves', width: 20 },
            { header: 'Correo', key: 'correo', width: 20 },
        ];

        companies.forEach(company => {
            worksheet.addRow({
                nombre: company.nombre,
                categoriaEmpresarial: company.categoriaEmpresarial,
                nivelImpacto: company.nivelImpacto,
                añosTrayectoria: company.añosTrayectoria,
                datosClaves: company.datosClaves,
                correo: company.correo,
            });
        });

        const filePath = path.join(__dirname, '../../configs/db', 'empresas_reporte.xlsx');
        await workbook.xlsx.writeFile(filePath);

        res.status(200).sendFile(filePath);
    } catch (error) {
        console.error('Error al generar el reporte:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
