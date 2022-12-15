const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Post.find();
    res.status(200).send(list);
  } catch (e) {
    console.log("---Erorr---/", e);
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже." });
  }
});

router.post("/new", auth, async (req, res) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(201).json(newPost);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже." });
  }
});

router.delete("/:postId", auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const removeedPost = await Post.findById(postId);

    await removeedPost.remove();

    return res.json(null);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже." });
  }
});

router.patch("/:postId", auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    res.json(updatedPost);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже." });
  }
});

module.exports = router;
