const Users = require("./users-model");
const db = require("../database/db-config");

beforeEach(async () => {
  await db("users").truncate();
});

describe("modules work", () => {
  describe("add method works", () => {
    it("will return an empty array", async () => {
      const users = await db("users");
      expect(users).toHaveLength(0);
    });

    it("will insert a new user", async () => {
      await Users.add({ username: "justin", password: "password" });
      await Users.add({ username: "mike", password: "password" });
      await Users.add({ username: "willwearing", password: "password" });
      const users = await db("users");
      expect(users).toHaveLength(3);
    });
  });
});
