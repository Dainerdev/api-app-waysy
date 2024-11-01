import { Router } from "express";
import { methods as expenseController } from "../controllers/expense.controller";

const router = Router();

router.get("/", expenseController.getExpenses); // Find all
router.get("/:id", expenseController.getExpenseById); // Find by id
router.post("/", expenseController.addExpenses); // Add
router.put("/:id", expenseController.updateExpense); // Edit
router.delete("/:id", expenseController.deleteExpense); // Delete

export default router;