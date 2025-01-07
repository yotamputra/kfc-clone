const express = require("express");
const PublicController = require("../controllers/publicController");
const router = express.Router();

router.get("/", PublicController.getAllCuisinesPublic);
router.get("/categories", PublicController.getAllCategoriesPublic);
router.get("/:id", PublicController.findCuisineByIdPublic);

module.exports = router;
