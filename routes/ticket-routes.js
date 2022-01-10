const router = require("express").Router();

const auth = require("./../middlewares/auth-middlewares");
const TicketController = require("./../controllers/ticket-controller");

router.post("/create", auth, TicketController.create);
router.get("/", TicketController.getAll);

module.exports = router;
