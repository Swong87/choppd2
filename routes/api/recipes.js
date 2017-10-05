const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");

// Matches with "/api/recipes"
router.route("/")
  .get(recipeController.findAll)
  .post(recipeController.createRecipe);

// Matches with "/api/recipes/:id"
router
  .route("/:id")
  .get(recipeController.findOne)
  .delete(recipeController.removeRecipe);

module.exports = router;
