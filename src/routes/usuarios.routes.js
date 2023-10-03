import { Router } from "express";
import {
  actualizarUsuarios,
  createUsuaros,
  eliminarUsuarios,
  getUsuario,
  getUsuarios,
} from "../controllers/usuarios.controller.js";
const router = Router();

router.get("/usuarios", getUsuarios);
router.get("/usuarios/:id", getUsuario);
router.post("/usuarios", createUsuaros);
router.patch("/usuarios/:id", actualizarUsuarios);
router.delete("/usuarios/:id", eliminarUsuarios);

export default router;
