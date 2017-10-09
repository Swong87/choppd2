const router = require("express").Router();
const challengeRoutes = require("./challenges");
const recipeRoutes = require("./recipes");
const userRoutes = require("./users");

// Book routes
router.use("/recipes", recipeRoutes);
router.use("/challenges", challengeRoutes);
router.use("/users", userRoutes);

module.exports = router;
