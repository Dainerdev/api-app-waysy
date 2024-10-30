import express from "express";
import morgan from "morgan";

// Routes imports
import userRoutes from "./routes/user.routes";

const app = express();

// Settings
app.set("port", 3312);

// Middlewares
app.use(morgan("dev")); // Modulo morgan modo desarrollo
app.use(express.json()); // Interpretar json

// Routes
app.use("/api/users",userRoutes);

export default app;