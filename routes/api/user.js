const router = require("express").Router();
const userController = require("../../controllers/userController");

router
  .route("/:id")
  .get(userController.findById)
  .put(userController.updateUser);

module.exports = router;