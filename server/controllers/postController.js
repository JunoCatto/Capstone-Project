import Models from "../models/index.js";

export const createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;

    // Error handling
    if (!userId || !content) {
      return res
        .status(400)
        .json({ message: "author and content are required" });
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
      userId,
      content: content.trim(),
    });
    const savedPost = await post.save();

    // populates post with user data for usage on the form
    const populatedPost = await Models.Post.findById(savedPost._id).populate(
      "userId",
      "userName"
    );
    res.status(200).json({ data: populatedPost });
    console.log(
      `New post of id: ${populatedPost._id} created by ${populatedPost.userId.userName}`
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: err.message });
  }
};

// find all posts for feed
export const getPosts = async (req, res) => {
  try {
    const posts = await Models.Post.find()
      .populate("userId", "userName")
      .sort({ createdAt: -1 }); // sorts posts top to bottom by date
    res.status(200).json({ data: posts });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: err.message });
  }
};

export default {
  createPost,
  getPosts,
};
