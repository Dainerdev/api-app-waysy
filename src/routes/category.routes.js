import { Router } from "express";
import { methods as categoryController } from "../controllers/category.controller";

const router = Router();

router.get("/", categoryController.getCategories); // Find all
router.get("/:id", categoryController.getCategoryById); // Find by id
router.get("/id/max", categoryController.getMaxId); // Get Max Id
router.get("/name/:nombre_categoria", categoryController.getCategoryByName); // Find by Name
router.get("/date/:fecha_recepcion", categoryController.getCategoryByDate); // Find by Date
router.get("/description/:descripcion", categoryController.getCategoryByDescription); // Find by Description

router.post("/", categoryController.addCategory); // Add
router.put("/:id", categoryController.updateCategory); // Edit
router.delete("/:id", categoryController.deleteCategory); // Delete

export default router;