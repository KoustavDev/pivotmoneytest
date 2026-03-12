import express from "express";
import cors from "cors";
import mfRoutes from "./routes/mfRoutes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: "*",
  }),
);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Hello pivot money!",
  });
});

// API Routes
app.use("/api/mf", mfRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
