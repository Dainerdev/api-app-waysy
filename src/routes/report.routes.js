import { Router } from "express";
import { methods as reportController } from "../controllers/report.controller";

const router = Router();

router.get("/:id/:fecha_inicial/:fecha_final", reportController.getReport);

export default router;