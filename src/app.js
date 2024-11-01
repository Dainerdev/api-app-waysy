import express from "express";
import morgan from "morgan";

// Routes imports
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import sourceRoutes from "./routes/source.routes";

const app = express();

// Settings
app.set("port", 3312);

// Middlewares
app.use(morgan("dev")); // Modulo morgan modo desarrollo
app.use(express.json()); // Interpretar json


// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sources", sourceRoutes);

export default app;