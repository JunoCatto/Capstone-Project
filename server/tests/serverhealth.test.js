import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";

describe("Server health check", () => {
  it("should return 200 status code", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
