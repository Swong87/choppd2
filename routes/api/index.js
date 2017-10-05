const router = require("express").Router();
const challengeRoutes = require("./challenges");

// Book routes
router.use("/recipes", challengeRoutes);
router.use("/discover", challengeRoutes);
router.use("/users", challengeRoutes);

module.exports = router;
