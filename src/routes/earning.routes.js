import { Router } from "express";
import { methods as earningController } from "../controllers/earning.controller";

const router = Router();

router.get("/", earningController.getEarnings); // Find all
router.get("/:id", earningController.getEarningById); // Find by id
router.post("/", earningController.addEarning); // Add
router.put("/:id", earningController.updateEarning); // Edit
router.delete("/:id", earningController.deleteEarning); // Delete

export default router;