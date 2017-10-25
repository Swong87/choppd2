const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");
const userController = require("../../controllers/userController");

router
  .route("/:id")
  .get(recipeController.findRecipes)
  .put(userController.deletePic);

module.exports = router;

//> API call > * >Recipe Controller
