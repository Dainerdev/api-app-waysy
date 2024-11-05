import { Router } from "express";
import { methods as userController } from "../controllers/user.controller";


const router = Router();

// GET
router.get("/", userController.getUsers); // Find all
router.get("/typeId", userController.getTypeId); // Find enum TypeId 
router.get("/gender", userController.getGender); // Find enum Gender
router.get("/role", userController.getRole); // Find enum Role
router.get("/:id", userController.getUserById); // Find by id
router.get("/question", userController.getUserById); // Find by id

// POST
router.post("/", userController.addUser); // Add
router.post("/login", userController.login); // Validate login

// PUT & DELETE
router.put("/:id", userController.updateUser); // Edit
router.delete("/:id", userController.deleteUser); // Delete


export default router;