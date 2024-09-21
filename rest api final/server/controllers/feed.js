const post = require("../models/post");

exports.getPosts = async (req, res, next) => {
  try {
    const result = await post.find();
    console.log("Result ", result);
    res.status(200).json({
      posts: result,
    });
  } catch (err) {}
};

exports.createPost = async (req, res, next) => {
  console.log("Req body: ", req.body);
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db

  const result = await post.create({
    content: content,
    creator: { name: "shivam kashyap" },
    imageUrl: req.file.path,
    title: title,
  });

  res.status(201).json({
    message: "Post created successfully!",
    post: result,
  });
};

exports.findPostById = async (req, res, next) => {
  const id = req.params.id;
  const result = await post.findById(id);
  console.log("Result: ", id, result);
  
  res.status(200).json({
    message: "Post created successfully!",
    post: result,
  });
};
