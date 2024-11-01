import { Router } from "express";
import { methods as sourceController } from "../controllers/source.controller";

const router = Router();

router.get("/", sourceController.getSources); // Find all
router.get("/:id", sourceController.getSourceById); // Find by id
router.post("/", sourceController.addSource); // Add
router.put("/:id", sourceController.updateSource); // Edit
router.delete("/:id", sourceController.deleteSource); // Delete

export default router;