const router = require("express").Router();
const recipeRoutes = require("./recipes");
const challengeRoutes = require("./challenges");
const userRoutes = require("./users");

// Book routes
router.use("/recipes", challengeRoutes);
router.use("/discover", challengeRoutes);
router.use("/users", challengeRoutes);

module.exports = router;
