import Models from "../models/index.js";

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user._id;

    // Error handling
    if (!userId || !content) {
      return res.status(400).json({ message: "user and content are required" });
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
    const userId = req.user._id; // comes from verified token
    const posts = await Models.Post.find()
      .populate("userId", "userName")
      .sort({ createdAt: -1 });

    // mark liked posts
    const postIds = posts.map((p) => p._id);
    const userLikes = await Models.Like.find({
      userId,
      postId: { $in: postIds },
    });
    const likedIds = new Set(userLikes.map((like) => like.postId.toString()));

    const formattedPosts = posts.map((post) => ({
      ...post.toObject(),
      liked: likedIds.has(post._id.toString()),
    }));

    res.status(200).json(formattedPosts);
  } catch (err) {
    console.error("Error fetching posts", err);
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const userId = req.user && req.user._id;
    const { postId } = req.params;
    console.log(`[GET] /post/${postId}`, { userId });
    const post = await Models.Post.findById(postId).populate(
      "userId",
      "userName"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });

    const like = await Models.Like.findOne({ postId, userId });
    const formatted = {
      ...post.toObject(),
      liked: !!like,
    };

    res.status(200).json({ data: formatted });
  } catch (err) {
    console.error("Error fetching post", err);
    res
      .status(500)
      .json({ message: "Failed to fetch post", error: err.message });
  }
};

export default {
  createPost,
  getPosts,
  getPost,
};
