import express from "express";
import "dotenv/config";
import mongoose from "./dbconnect.js";
import cors from "cors";
import path from "path";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

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
  console.log("Server is running at http://localhost:5000");
});
