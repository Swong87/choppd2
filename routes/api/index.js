const router = require("express").Router();
const challengeRoutes = require("./challenges");
const recipeRoutes = require("./recipes");

// Book routes
router.use("/recipes", recipeRoutes);
router.use("/challenges", challengeRoutes);

module.exports = router;
