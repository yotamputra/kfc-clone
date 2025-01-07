const express = require("express");
const CuisineController = require("../controllers/cuisineController");
const router = express.Router();

const authorization = require("../middlewares/authorizationCuisine");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });


router.post("/", CuisineController.addCuisine);
router.get("/", CuisineController.getAllCuisines);

router.get("/:id", CuisineController.findCuisineById);

router.put("/:id", authorization, CuisineController.updateCuisine);

router.delete("/:id", authorization, CuisineController.deleteCuisine);

router.patch(
  "/:id",
  authorization,
  upload.single("imgUrl"),
  CuisineController.uploadImage
);

module.exports = router;
