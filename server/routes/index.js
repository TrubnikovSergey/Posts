const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/posts", require("./post.routes"));
router.use("/users", require("./user.routes"));

module.exports = router;
