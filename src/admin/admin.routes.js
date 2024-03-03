import { Router } from "express";
import { check } from "express-validator";
import {
  getAdmins,
  createAdmin,
  getAdminById,
} from "./admin.controller.js";

import {
    existenteEmail,
    existeAdminById
} from "../helpers/db-validators.js"

import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();
router.get("/", getAdmins);
/*
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    validarCampos,
  ],
  getAdminById
);
*/

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "Este no es un correo válido").isEmail(),
    check("correo").custom(existenteEmail),
    validarCampos,
  ],
  createAdmin
);

export default router;
