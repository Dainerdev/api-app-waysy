import { Router } from "express";
import { methods as userController } from "../controllers/user.controller";


const router = Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.addUser);

export default router;