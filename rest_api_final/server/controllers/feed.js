const post = require("../models/post");
const path = require("path");

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
  console.log("Req body: ", req.file); // Log to verify req.file is correct
  
  const title = req.body.title;
  const content = req.body.content;
  
  if (!req.file) {
    return res.status(400).json({ message: "File not provided!" });
  }

  // Get the file name using path.basename
  const fileName = path.basename(req.file.path);

  // Create post in the database
  const result = await post.create({
    content: content,
    creator: { name: "shivam kashyap" },
    imageUrl: `http://localhost:4000/uploads/${fileName}`, // Public URL for the image
    title: title,
  });

  // Respond with success
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
