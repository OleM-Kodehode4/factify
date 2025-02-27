import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start database og server
const startServer = async () => {
  try {
    await sequelize.sync(); // Opprett tabeller hvis de ikke finnes
    console.log("Database synced!");

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();

export default app;
