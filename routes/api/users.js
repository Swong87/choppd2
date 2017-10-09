const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/recipes"
router.route("/")
  .get(usersController.findAll)
  .post(usersController.createUser);
  

// Matches with "/api/recipes/:id"
router
  .route("/:id")
  .get(usersController.findOne);

module.exports = router;