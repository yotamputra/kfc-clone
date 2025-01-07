const express = require("express");
const router = express.Router();

const publicRouter = require("./public")
const cuisineRouter = require('./cuisines')
const categoryRouter = require('./categories');
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorizationUser = require('../middlewares/authorizationUser')

router.get("/", (req, res) => {
  res.send({ message: "App running" });
});


router.use("/pub", publicRouter)


router.post("/add-user", authentication, authorizationUser, UserController.register);
router.post("/login", UserController.login);


router.use(authentication);

router.use("/cuisines", cuisineRouter);

router.use("/categories", categoryRouter);

module.exports = router;
