import { Router } from "express";
import { methods as earningController } from "../controllers/earning.controller";

const router = Router();

router.get("/", earningController.getEarnings); // Find all
router.get("/:id", earningController.getEarningById); // Find by id
router.get("/id/max", earningController.getMaxId); // Get Max Id
router.get("/saldo/:id", earningController.getActualEarnings); // Get Actual Earnings
router.get("/name/:nombre_ingreso", earningController.getEarningByName); // Find by Name
router.get("/date/:fecha_recepcion", earningController.getEarningByDate); // Find by Date
router.get("/value/:valor_ingreso", earningController.getEarningByValue); // Find by Value
router.get("/source/:fuente_id", earningController.getEarningBySource); // Find by Value

router.post("/", earningController.addEarning); // Add
router.put("/:id", earningController.updateEarning); // Edit
router.delete("/:id", earningController.deleteEarning); // Delete

export default router;