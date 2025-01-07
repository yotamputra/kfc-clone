const request = require("supertest");

const app = require("../app");

const { sequelize } = require("../models");
const { hashPass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

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

  let categories = require("../data/categories.json");

  categories = categories.map((categories) => {
    categories.createdAt = new Date();
    categories.updatedAt = new Date();
    return categories;
  });

  await queryInterface.bulkInsert("Categories", categories, {});

  let cuisines = require("../data/cuisines-public-test.json");

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

describe("GET /pub", () => {
  describe("Success read cuisine", () => {
    test("Success 200 OK", async () => {
      const res = await request(app)
        .get("/pub")

      console.log(res.body, "<--- read PUBLIC cuisines");
      expect(res.status).toBe(200);
      expect(res.body.totalData).toBe(20);
    });
  });

  describe("Success read cuisine with params 1", () => {
    test("Success 200 OK", async () => {
      const res = await request(app)
        .get("/pub?page[size]=5&page[number]=4")

      console.log(res.body, "<--- read PUBLIC cuisines with pagination");
      expect(res.status).toBe(200);
      expect(res.body.totalPage).toBe(4);
      expect(res.body.dataPerPage).toBe(5);
    });
  });
});

describe("GET /pub:id", () => {
  describe("Success read cuisine by id", () => {
    test("Success 200 OK", async () => {
      const res = await request(app)
        .get("/pub/2")

      console.log(res.body, "<--- read PUBLIC cuisines by id 2");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", 2);
      expect(res.body).toHaveProperty("name", "Fried Chicken");
      expect(res.body).toHaveProperty("description", "Delicious deep fried chicken.");
      expect(res.body).toHaveProperty("imgUrl", 'https://i0.wp.com/www.savourous.com/wp-content/uploads/2019/05/KFC-chicken1.jpg?fit=3456%2C3456&ssl=1');
      expect(res.body).toHaveProperty("price", 30000);
      expect(res.body).toHaveProperty("categoryId", 1);
      expect(res.body).toHaveProperty("authorId", 1);
    });
  });

  describe("Failed read cuisine by id", () => {
    test("Error 200 OK", async () => {
      const res = await request(app)
        .get("/pub/50")

      console.log(res.body, "<--- error read PUBLIC cuisines by invalid id");
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", 'Error not found');
    });
  });
});
