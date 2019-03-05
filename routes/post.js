const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/", controllers.post.index);

module.exports = router;
