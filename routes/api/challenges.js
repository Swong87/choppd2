const router = require("express").Router();
const challengesController = require("../../controllers/challengesController");

// Matches with "/api/recipes"
router.route("/")
  .get(challengesController.findAll)
  .post(challengesController.createChallenge);

// Matches with "/api/recipes/:id"
router
  .route("/:id")
  .get(challengesController.findOne)
  .post(challengesController.createRecipe)
  .put(challengesController.removeChallenge)
  .delete(challengesController.removeRecipe);

module.exports = router;
