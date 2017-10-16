const router = require("express").Router();
const challengeRoutes = require("./challenges");
const recipeRoutes = require("./recipes");
const authRoutes = require("./auth");
const userRoutes = require("./user");

// Recipe routes
router.use("/recipes", recipeRoutes);
// challenge routes
router.use("/challenges", challengeRoutes);
// Auth routes
router.use("/auth", authRoutes);
// user routes
router.use("/users", userRoutes);

module.exports = router;
