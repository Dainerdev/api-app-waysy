import { Router } from "express";
import { methods as userController } from "../controllers/user.controller";


const router = Router();

router.get("/", userController.getUsers); // Find all
router.get("/:id", userController.getUserById); // Find by id
router.post("/", userController.addUser); // Add
router.put("/:id", userController.updateUser); // Edit
router.delete("/:id", userController.deleteUser); // Delete


export default router;