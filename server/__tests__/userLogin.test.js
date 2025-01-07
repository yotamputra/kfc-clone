const request = require("supertest");

const app = require("../app");

const { sequelize } = require('../models');
const { hashPass } = require("../helpers/bcrypt");
const { queryInterface } = sequelize

beforeAll(async () => {
  const users = [
    {
      username: 'admin',
      email: "admin@gmail.com",
      password: hashPass("admin123"),
      role: "Admin",
      phoneNumber: "123-456-7890",
      address: "123 Admin Street, Cityville, 12345",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'staff',
      email: "staff@gmail.com",
      password: hashPass("staff123"),
      role: "Staff",
      phoneNumber: "098-765-4321",
      address: "456 User Lane, Townsville, 67890",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  await queryInterface.bulkInsert("Users", users, {})
})

afterAll(async () => {
  await queryInterface.bulkDelete("Users", {}, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  })
})

describe('POST /login', () => {
  describe('Success Login', () => {
    test('Success 200 OK', async () => {
      const res = await request(app).post('/login').send({
        email: "admin@gmail.com",
        password: "admin123"
      })
      // console.log(res.body, '<--')
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("access_token", expect.any(String))
    })
  })

  describe('Failed 400 empty email', () => {
    test('Failed 400 empty email', async () => {
      const res = await request(app).post('/login').send({
        email: "",
        password: "admin123"
      })
      // console.log(res.body, '<--')
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty("message", 'Email is required')
    })
  })

  describe('Failed 400 empty password', () => {
    test('Failed 400 empty password', async () => {
      const res = await request(app).post('/login').send({
        email: "admin@gmail.com",
        password: ""
      })
      // console.log(res.body, '<--')
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty("message", 'Password is required')
    })
  })

  describe('Error 401 email invalid', () => {
    test('Error 401 email invalid', async () => {
      const res = await request(app).post('/login').send({
        email: "failedtest@gmail.com",
        password: "abc123"
      })
      // console.log(res.body, '<--')
      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty("message", 'Error invalid username or email or password')
    })
  })

  describe('Error 401 password invalid', () => {
    test('Error 401 password invalid', async () => {
      const res = await request(app).post('/login').send({
        email: "admin@gmail.com",
        password: "abc123"
      })
      // console.log(res.body, '<--')
      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty("message", 'Error invalid username or email or password')
    })
  })
})