const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/", controllers.post.index);
router.post("/createpost", controllers.post.createPost);
router.delete('/deletepost', controllers.post.deletePost);

module.exports = router;
