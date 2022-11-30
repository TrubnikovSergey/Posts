const express = require("express");
const router = express.Router({ mergeParams: true });

router.post("/signUp", async (req, res) => {});
router.post("/signIn", async (req, res) => {});
router.post("/signOut", async (req, res) => {});

module.exports = router;
