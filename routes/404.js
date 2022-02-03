const { Router } = require("express");

const { get404 } = require("../controllers/404");

// /any
const router = Router();

router.get("/", get404);

module.exports = router;
