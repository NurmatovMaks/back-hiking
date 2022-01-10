const router = require("express").Router();
const userRoutes = require("./user-routes");
const ticketRoutes = require("./ticket-routes");

console.log("qwe");
router.use("/user", userRoutes);
router.use("/ticket", ticketRoutes);

module.exports = router;
