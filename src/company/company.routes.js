import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";

import { 
    addCompany,
    viewCompanies, 
    //editCompany, 
    generateReport } from "./company.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRol } from "../middlewares/validar-roles.js";

const router = Router();

router.post(
    '/',
    [
        validarJWT,
        tieneRol('ADMIN_ROLE'),
        check('nombre', 'The name is required').not().isEmpty(),
        check('categoriaEmpresarial', 'The business category is required').not().isEmpty(),
        check('nivelImpacto', 'The impact level is required').not().isEmpty(),
        check('añosTrayectoria', 'Years of trajectory is required').isNumeric(),
        check('datosClaves', 'Key data is required').not().isEmpty(),
        check('correo', 'Email is mandatory').isEmail(),
        validarCampos,
    ], addCompany);

router.get('/', 
    
    validarJWT,
    viewCompanies);
/* 
router.put(
    '/:id',
    [
        check('nombre', 'The name is required').not().isEmpty(),
        check('categoriaEmpresarial', 'The business category is required').not().isEmpty(),
        check('nivelImpacto', 'The impact level is required').not().isEmpty(),
        check('añosTrayectoria', 'Years of trajectory is required').isNumeric(),
        check('datosClaves', 'Key data is required').not().isEmpty(),
        validarCampos,
    ], editCompany);
*/
router.get('/report', 

    validarJWT,
    generateReport);

export default router;
