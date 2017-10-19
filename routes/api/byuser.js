const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");

router
  .route("/:id")
  .get(recipeController.findRecipes);

module.exports = router;

//> API call > * >Recipe Controller
