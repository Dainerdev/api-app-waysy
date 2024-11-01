import { Router } from "express";
import { methods as categoryController } from "../controllers/category.controller";

const router = Router();

router.get("/", categoryController.getCategories); // Find all
router.get("/:id", categoryController.getCategoryById); // Find by id
router.post("/", categoryController.addCategory); // Add
router.put("/:id", categoryController.updateCategory); // Edit
router.delete("/:id", categoryController.deleteCategory); // Delete

export default router;