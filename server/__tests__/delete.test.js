const request = require("supertest");

const app = require("../app");

const { sequelize } = require("../models");
const { hashPass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let adminToken;
let staffToken;

beforeAll(async () => {
  const users = [
    {
      username: "admin",
      email: "admin@gmail.com",
      password: hashPass("admin123"),
      role: "Admin",
      phoneNumber: "123-456-7890",
      address: "123 Admin Street, Cityville, 12345",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "staff",
      email: "staff@gmail.com",
      password: hashPass("staff123"),
      role: "Staff",
      phoneNumber: "098-765-4321",
      address: "456 User Lane, Townsville, 67890",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await queryInterface.bulkInsert("Users", users, {});

  adminToken = signToken({ id: 1 });
  staffToken = signToken({ id: 2 });

  let categories = require("../data/categories.json");

  categories = categories.map((categories) => {
    categories.createdAt = new Date();
    categories.updatedAt = new Date();
    return categories;
  });

  await queryInterface.bulkInsert("Categories", categories, {});

  let cuisines = require("../data/cuisines.json");

  cuisines = cuisines.map((cuisines) => {
    cuisines.createdAt = new Date();
    cuisines.updatedAt = new Date();
    return cuisines;
  });

  await queryInterface.bulkInsert("Cuisines", cuisines, {});
});

afterAll(async () => {
  await queryInterface.bulkDelete(
    "Cuisines",
    {},
    {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    }
  );

  await queryInterface.bulkDelete(
    "Categories",
    {},
    {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    }
  );

  await queryInterface.bulkDelete(
    "Users",
    {},
    {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    }
  );
});

describe("DELETE /cuisines/:id", () => {
  describe("Success delete cuisine", () => {
    test("Success 200 OK", async () => {
      const res = await request(app)
        .delete("/cuisines/1")
        .set({
          authorization: `Bearer ${adminToken}`,
        });

      // console.log(res.body, "<--- delete cuisine");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Cream Soup deleted successfully");
    });
  });

  describe("Failed delete cuisine", () => {
    test("Error 401 No Token", async () => {
      const res = await request(app)
        .delete("/cuisines/2")

      // console.log(res.body, "<--- invalid token");
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid token");
    });
  });

  describe("Failed delete cuisine", () => {
    test("Error 401 Invalid Token", async () => {
      const res = await request(app)
        .delete("/cuisines/2")
        .set({
          authorization: `Bearer invalidToken`,
        });

      // console.log(res.body, "<--- invalid token");
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid token");
    });
  });

  describe("Failed delete cuisine", () => {
    test("Error 404 Not Found", async () => {
      const res = await request(app)
        .delete("/cuisines/10")
        .set({
          authorization: `Bearer ${adminToken}`,
        });

      // console.log(res.body, "<--- data not found");
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Error not found");
    });
  });

  describe("Failed delete cuisine, authorization denied", () => {
    test("Error 403 No Access", async () => {
      const res = await request(app)
        .delete("/cuisines/2")
        .set({
          authorization: `Bearer ${staffToken}`,
        });

      console.log(res.body, "<--- no access");
      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty("message", "You don't have access");
    });
  });
});
