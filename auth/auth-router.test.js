const server = require("../api/server");
const request = require("supertest");
const db = require("../database/db-config");
const User = require("../users/users-model");

beforeEach(async () => {
  await db("users").truncate();
});

describe("[POST] /api/auth/register", () => {
  it("registering a new user", () => {
    request(server)
      .post("/api/auth/register")
      .send({ username: "mike", password: "password" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
