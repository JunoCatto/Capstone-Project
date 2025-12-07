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

// create a new user -> host/api/user
export const createUser = async (req, res) => {
  try {
    const user = new Models.User(req.body);

    user.profilePic = {
      data: defaultProfilePic,
      contentType: "image/png",
    };

    const savedUser = await user.save();
    res.send({ result: "success", data: savedUser });
    console.log("user created with successfully, user id is ", savedUser._id);
  } catch (err) {
    res.send({ result: "failed", data: err });
    console.log(err);
  }
};

// find user by id -> host/api/user/:id
export const findUserById = async (req, res) => {
  try {
    const user = await Models.User.findById(req.params.id);
    if (!user) {
      return res.send({ result: "failed", data: "user does not exist" });
    }
    res.send({ result: "success", data: user });
  } catch (err) {
    res.send({ result: "failed", data: err });
    console.log(err);
  }
};

export default {
  createUser,
  findUserById,
};
