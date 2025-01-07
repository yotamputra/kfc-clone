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

describe("POST /cuisines", () => {
  describe("Success add cuisine", () => {
    test("Success 200 OK", async () => {
      const res = await request(app)
        .post("/cuisines")
        .send({
          name: "Pizza",
          description:
            "Pizza is an Italian flatbread topped with tomato sauce, cheese, and various ingredients",
          price: 50000,
          imgUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTedUeWfNA42ORivu3l2whWDkXNY9FiL_IIMA&s",
          categoryId: 1,
        })
        .set({
          authorization: `Bearer ${adminToken}`,
        });

      // console.log(res.body, "<--- create cuisine");
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id", expect.any(Number));
      expect(res.body).toHaveProperty("name", "Pizza");
      expect(res.body).toHaveProperty(
        "description",
        "Pizza is an Italian flatbread topped with tomato sauce, cheese, and various ingredients"
      );
      expect(res.body).toHaveProperty("price", 50000);
      expect(res.body).toHaveProperty(
        "imgUrl",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTedUeWfNA42ORivu3l2whWDkXNY9FiL_IIMA&s"
      );
      expect(res.body).toHaveProperty("categoryId", 1);
      expect(res.body).toHaveProperty("authorId", 1);
    });
  });

  describe("Failed add cuisine with no token", () => {
    test("Failed 401 no access token", async () => {
      const res = await request(app).post("/cuisines").send({
        name: "Pizza",
        description:
          "Pizza is an Italian flatbread topped with tomato sauce, cheese, and various ingredients",
        price: 50000,
        imgUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTedUeWfNA42ORivu3l2whWDkXNY9FiL_IIMA&s",
        categoryId: 1,
      });

      // console.log(res.body, "<--- 401 no access token");
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid token");
    });
  });

  describe("Failed add cuisine invalid token", () => {
    test("Failed 401 invalid token", async () => {
      const res = await request(app)
        .post("/cuisines")
        .send({
          name: "Pizza",
          description:
            "Pizza is an Italian flatbread topped with tomato sauce, cheese, and various ingredients",
          price: 50000,
          imgUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTedUeWfNA42ORivu3l2whWDkXNY9FiL_IIMA&s",
          categoryId: 1,
        })
        .set({
          authorization: `Bearer falseToken`,
        });

      // console.log(res.body, "<--- invalid token");
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid token");
    });
  });

  describe("Failed add cuisine invalid req.body", () => {
    test("Error 400 req.body required", async () => {
      const res = await request(app)
        .post("/cuisines")
        .send({
          name: "",
          description:
            "Pizza is an Italian flatbread topped with tomato sauce, cheese, and various ingredients",
          price: 50000,
          imgUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTedUeWfNA42ORivu3l2whWDkXNY9FiL_IIMA&s",
          categoryId: 1,
        })
        .set({
          authorization: `Bearer ${adminToken}`,
        });

      // console.log(res.body, "<--- invalid req.body");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Name cannot be empty");
    });
  });
});
