import request from "supertest";
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";
import app from "../app.js";
import { User } from "../models/user.js";
import { Post } from "../models/post.js"; // make sure this exists

let mongo;
let testUserId;

// Generate a JWT token for the created test user
function generateToken() {
  return jwt.sign(
    { _id: testUserId, userName: "testUser" },
    process.env.JWT_SECRET || "secret"
  );
}

// Start in-memory MongoDB before all tests
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

// Clean up database before each test
beforeEach(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});

  const user = await User.create({
    _id: new mongoose.Types.ObjectId(),
    userName: "testUser",
    password: "testing", // password >= 6 chars
  });
  testUserId = user._id;
});

describe("POST /api/user/post", () => {
  it("should return 401 if no token", async () => {
    const res = await request(app).post("/api/user/post");
    expect(res.statusCode).toBe(401);
  });

  it("should return 400 if content empty", async () => {
    const res = await request(app)
      .post("/api/user/post")
      .set("Authorization", `Bearer ${generateToken()}`)
      .send({ content: "" });
    expect(res.statusCode).toBe(400);
  });

  it("should return 422 if content too long", async () => {
    const res = await request(app)
      .post("/api/user/post")
      .set("Authorization", `Bearer ${generateToken()}`)
      .send({ content: "a".repeat(281) });
    expect(res.statusCode).toBe(422);
  });

  it("should return 200 if post created", async () => {
    const res = await request(app)
      .post("/api/user/post")
      .set("Authorization", `Bearer ${generateToken()}`)
      .send({ content: "test post" });
    expect(res.statusCode).toBe(200);
  });
});
