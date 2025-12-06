"use strict";

import Models from "../models/index.js";

// create a new user -> host/api/user
export const createUser = async (req, res) => {
  try {
    const user = new Models.User(req.body);
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
    res.send({ result: "success", data: user });
    if (!user) {
      res.send({ result: "failed", data: "user does not exist" });
    }
  } catch (err) {
    res.send({ result: "failed", data: err });
    console.log(err);
  }
};

export default {
  createUser,
  findUserById,
};
