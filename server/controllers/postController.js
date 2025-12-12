import Models from "../models/index.js";

export const createPost = async (req, res) => {
  try {
    const { userId, userName, content } = req.body;

    // Error handling
    if (!userId || !userName || !content) {
      return res
        .status(400)
        .json({ message: "userId, userName, and content are required" });
    }
    if (content.trim().length === 0) {
      return res.status(400).json({ message: "Post content cannot be empty" });
    }
    if (content.length > 280) {
      return res
        .status(422)
        .json({ message: "Post content is too long. Maximum 280 characters" });
    }

    const post = new Models.Post({
      content: content.trim(),
      author: userName,
      userId: userId,
    });
    const savedPost = await post.save();
    res.status(200).json({ data: savedPost });
    console.log(`New post of id: ${savedPost._id} created by ${userName}`);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: err.message });
  }
};

// find all posts for feed
export const getPosts = async (req, res) => {
  try {
    const posts = await Models.Post.find().sort({ createdAt: -1 }); // sorts posts top to bottom by date
    res.status(200).json({ data: posts });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get posts", error: err.message });
  }
};

export default {
  createPost,
  getPosts,
};
