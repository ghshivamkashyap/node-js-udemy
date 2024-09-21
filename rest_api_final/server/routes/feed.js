const express = require("express");
const { getPosts, createPost, findPostById } = require("../controllers/feed");

const router = express.Router();

// GET /feed/posts
router.get("/posts", getPosts);

// POST /feed/post
router.post("/post", createPost);

// get singler post by id 
router.get("/getpost/:id", findPostById);

module.exports = router;
