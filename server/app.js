import express from "express";
import "dotenv/config";
import mongoose from "./dbconnect.js";
import cors from "cors";
import { connectDB } from "./dbconnect.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

if (process.env.NODE_ENV !== "test") {
  connectDB(process.env.MONGODB_URI || "mongodb://localhost:27017/test");
}

app.use(cors());

// landing Page
app.get("/", (req, res) => {
  res.status(200).json({ message: "Running mongodb server" });
});

// middlewares - routing - /api/*
app.use(express.json());
import routes from "./routes/index.js";
app.use("/api", routes);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
// 404 error handler
app.use((req, res) => {
  res.status(404).json({ message: "404 Page not found" });
});

export default app;
