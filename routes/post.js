const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/", controllers.post.index);

router.use((req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    let verified = jwt.verify(req.token, "bWF0dGJyYW5kb25qb2VjaHJpc3RpbmE=");
    console.log("Verified ", verifed);
    req.userId = verified._id;
    next();
  } else {
    res.sendStatus(403);
  }
});

router.post("/createpost", controllers.post.createPost);
router.delete("/deletepost", controllers.post.deletePost);
router.put("/updatepost", controllers.post.updatePost);

module.exports = router;
