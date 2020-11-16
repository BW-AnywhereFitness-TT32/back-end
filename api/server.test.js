const request = require("supertest");
const server = require("./server.js");

describe("server.js module", () => {
  it("is the testing environment", () => {
    expect(process.env.DB_ENV).not.toBe("development");
    expect(process.env.DB_ENV).not.toBe("production");
    expect(process.env.DB_ENV).toBe("testing");
  });
  describe("[GET] /", () => {
    it("works", () => {
      return request(server)
        .get("/")
        .expect("Content-Type", /json/)
        .expect("Content-Length", "12")
        .expect({ api: "up" });
    });
  });
});
