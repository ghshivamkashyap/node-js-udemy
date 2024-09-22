const express = require("express");
const { getPosts, createPost, findPostById } = require("../controllers/feed");
const { auth } = require("../middleware/auth");

const router = express.Router();

// GET /feed/posts
router.get("/posts", auth, getPosts);

// POST /feed/post
router.post("/post", auth, createPost);

// get singler post by id
router.get("/getpost/:id", auth, findPostById);

module.exports = router;
