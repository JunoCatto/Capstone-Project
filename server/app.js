import express from "express";
import "dotenv/config";
import mongoose from "./dbconnect.js";
import cors from "cors";
import { connectDB } from "./dbconnect.js";

const app = express();

if (process.env.NODE_ENV !== "test") {
  connectDB(process.env.MONGODB_URI || "mongodb://localhost:27017/test");
}

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

export default app;
