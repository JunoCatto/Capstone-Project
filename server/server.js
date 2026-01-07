import express from "express";
import "dotenv/config";
import mongoose from "./dbconnect.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "https://capstone-project-frontend-767r.onrender.com",
    credentials: true,
  })
);

// landing page
app.get("/", (req, res) => {
  res.status(200).json({ message: "Running mongodb server" });
});

// middlewares - routing - /api/*
app.use(express.json());
import routes from "./routes/index.js";
app.use("/api", routes);

// 404 error handler
app.use((req, res) => {
  res.status(404).json({ message: "404 Page not found" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running on port", PORT);
});
