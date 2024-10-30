import { Router } from "express";
import { methods as userController } from "../controllers/user.controller";


const router = Router();

router.get("/", userController.getUsers);
router.get("/search/:id", userController.getUserById);
router.post("/add", userController.addUser);

export default router;