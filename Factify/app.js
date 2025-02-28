import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./sequelize.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import factRoutes from "./routes/factRoutes.js";

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/facts", factRoutes);

app.get("/health", async (req, res) => {
  console.log("Health endpoint was hit!"); // Debug-logg
  try {
    await sequelize.authenticate();
    res.status(200).json({ message: "Database connection is active!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Database connection failed", error: error.message });
  }
});

export default app;
