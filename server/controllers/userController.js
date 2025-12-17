"use strict";

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import Models from "../models/index.js";

// default profile pic for new users
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultProfilePic = fs.readFileSync(
  path.join(__dirname, "../assets/default.png")
);

// create a new user -> host/api/user/register
export const createUser = async (req, res) => {
  try {
    // User Validation
    const { userName, password } = req.body;

    // Username
    if (!userName || typeof userName !== "string") {
      return res.status(400).json({
        message: "Username must be between 3 and 20 characters",
        error: "validation_error",
      });
    }
    if (userName.length < 3 || userName.length > 20) {
      return res.status(400).json({
        message: "Username must be between 3 and 20 characters",
        error: "validation_error",
      });
    }
    if (!/^[a-zA-Z0-9_]+$/.test(userName)) {
      return res.status(400).json({
        message: "Username can only contain letters, numbers, and underscores",
        error: "validation_error",
      });
    }

    // Password
    if (!password || typeof password !== "string") {
      return res.status(400).json({
        message: "Password is required",
        error: "validation_error",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be atleast 6 characters",
        error: "validation_error",
      });
    }

    const user = new Models.User(req.body);
    user.profilePic = {
      data: defaultProfilePic,
      contentType: "image/png",
    };
    const savedUser = await user.save();
    res.status(200).json({ data: savedUser });
    console.log(
      `User ${savedUser.userName} created successfully: ${savedUser._id}`
    );
  } catch (err) {
    // MongoDB duplicate key
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Username already exists",
        error: "duplicate_username",
      });
    }
    // Validation Errors
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Failed",
        error: err.message,
      });
    }
    // Generic Error
    res
      .status(500)
      .json({ message: "Failed to create user", error: err.message });
  }
};

// login user -> host/api/user/login
export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await Models.User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "That user does not exist" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    res.status(200).json({ data: user });
    console.log(`User ${userName} signed in successfully`);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to login user", error: err.message });
  }
};

// find user by id -> host/api/user/:id
export const findUserById = async (req, res) => {
  try {
    const user = await Models.User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ data: "User does not exist" });
    }
    res.status(200).json({ data: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to find user", error: err.message });
  }
};

// Find all users -> host/api/user
export const findAllUsers = async (req, res) => {
  try {
    const user = await Models.User.Find();
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ message: "Failed to find all users", error: err });
  }
};

// Find user profilepic host/api/user/:id/pic
export const findUserProfilePic = async (req, res) => {
  try {
    const user = await Models.User.findById(req.params.id);
    if (!user || !user.profilePic) {
      return res.sendStatus(404);
    }
    res.set("Content-Type", user.profilePic.contentType);
    // Possible to cache the picture here as well
    res.send(user.profilePic.data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get profile picture", error: err.message });
  }
};

export default {
  createUser,
  loginUser,
  findUserById,
  findAllUsers,
  findUserProfilePic,
};
