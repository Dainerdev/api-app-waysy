import express from "express";
import morgan from "morgan";
import cors from "cors";

// Routes imports
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import sourceRoutes from "./routes/source.routes";
import expenseRoutes from "./routes/expense.routes";
import earningRoutes from "./routes/earning.routes";

const app = express();

// Settings
app.set("port", 3312);

// Middlewares
app.use(morgan("dev")); // Modulo morgan modo desarrollo
app.use(express.json()); // Interpretar json
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sources", sourceRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/earnings", earningRoutes);

export default app;