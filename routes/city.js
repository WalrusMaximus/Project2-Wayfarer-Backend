const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/", controllers.city.index);



module.exports = router;
