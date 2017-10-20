const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");

// Matches with "/api/recipes"
router.route("/")
  .get(recipeController.findAll);
  

// Matches with "/api/recipes/:id"
router
  .route("/:id")
  .get(recipeController.findOne)
  .post(recipeController.createRecipe)
  .delete(recipeController.removeRecipe);

module.exports = router;

//> API call > * >Recipe Controller
