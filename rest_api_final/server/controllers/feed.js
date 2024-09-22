const post = require("../models/post");
const path = require("path");
const User = require("../models/user");
const io = require("../socket");

// exports.getPosts = async (req, res, next) => {
//   try {
//     const result = await post.find();
//     // console.log("Result ", result);
//     res.status(200).json({
//       posts: result,
//     });
//   } catch (err) {}
// };

exports.getPosts = async (req, res, next) => {
  try {
    const result = await post.find().populate("creator", "name email");
    // You can specify which fields of the User model you want to retrieve (e.g., name, email)

    res.status(200).json({
      posts: result,
    });
  } catch (err) {
    console.log("Error in getPosts: ", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.createPost = async (req, res, next) => {
  console.log("Req user in create post: ", req.user);

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
    creator: req.user.id,
    imageUrl: `http://localhost:4000/uploads/${fileName}`, // Public URL for the image
    title: title,
  });

  // update user also
  const updatedUser = await User.findByIdAndUpdate(req.user.id, {
    $push: { posts: result._id },
  });

  io.getIO().emit("posts", {
    action: "create",
    post: {
      ...result._doc,
      creator: { _id: req.user.id, name: updatedUser.name },
    },
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
