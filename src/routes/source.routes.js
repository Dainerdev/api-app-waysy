import { Router } from "express";
import { methods as sourceController } from "../controllers/source.controller";

const router = Router();

router.get("/", sourceController.getSources); // Find all
router.get("/:id", sourceController.getSourceById); // Find by id
router.get("/name/:nombre_fuente", sourceController.getSourceByName); // Find by Name
router.get("/description/:descripcion", sourceController.getSourceByDescription); // Find by Description
router.get("/date/:fecha_recepcion", sourceController.getSourceByDate); // Find by Date
router.get("/id/max", sourceController.getMaxId); // Get Max Id
router.get("/names/values", sourceController.getSourceNames); // Get Names

router.post("/", sourceController.addSource); // Add
router.put("/:id", sourceController.updateSource); // Edit
router.delete("/:id", sourceController.deleteSource); // Delete

export default router;