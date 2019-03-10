const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/", controllers.city.index);
router.get("/:id", controllers.city.showOne);

module.exports = router;
