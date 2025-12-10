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
    res.status(500).json({ data: err });
    console.log(err);
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
    res.status(500).json({ data: err });
    console.log(err);
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
    res.status(500).json({ data: err });
    console.log(err);
  }
};

// Find all users -> host/api/user
export const findAllUsers = async (req, res) => {
  try {
    const user = await Models.User.Find();
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ data: err });
    console.log(err);
  }
};

export default {
  createUser,
  loginUser,
  findUserById,
  findAllUsers,
};
