import { Router } from "express";
import { methods as userController } from "../controllers/user.controller";


const router = Router();

router.get("/", userController.getUsers); // Find all
router.get("/typeId", userController.getTypeId); // Find enum TypeId 
router.get("/gender", userController.getGender); // Find enum Gender
router.get("/role", userController.getRole); // Find enum Role
router.get("/:id", userController.getUserById); // Find by id
router.post("/", userController.addUser); // Add
router.put("/:id", userController.updateUser); // Edit
router.delete("/:id", userController.deleteUser); // Delete


export default router;