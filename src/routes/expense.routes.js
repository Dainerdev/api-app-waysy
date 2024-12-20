import { Router } from "express";
import { methods as expenseController } from "../controllers/expense.controller";

const router = Router();

router.get("/", expenseController.getExpenses); // Find all
router.get("/:id", expenseController.getExpenseById); // Find by id
router.get("/id/max", expenseController.getMaxId); // Get Max Id
router.get("/saldo/:id", expenseController.getActualExpenses); // Get Actual Expenses
router.get("/name/:nombre_gasto", expenseController.getExpensesByName); // Find by Name
router.get("/date/:fecha_recepcion", expenseController.getExpensesByDate); // Find by Date
router.get("/value/:valor_gasto", expenseController.getExpensesByValue); // Find by Value
router.get("/category/:categoria_id", expenseController.getExpensesByCategory); // Find by Category

router.post("/", expenseController.addExpenses); // Add
router.put("/:id", expenseController.updateExpense); // Edit
router.delete("/:id", expenseController.deleteExpense); // Delete

export default router;