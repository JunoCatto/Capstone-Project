import Models from "../models/index.js";

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user && req.user._id;
    // add max length check etc
    if (!userId || !postId || !content) {
      return res
        .status(400)
        .json({ message: "post, user and content required" });
    }
    if (content.trim().length === 0) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const post = await Models.Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = new Models.Comment({
      postId,
      userId,
      content: content.trim(),
    });
    const saved = await comment.save();

    // increment post comment count
    post.commentsCount = (post.commentsCount || 0) + 1;
    await post.save();

    const populated = await Models.Comment.findById(saved._id).populate(
      "userId",
      "userName"
    );

    res.status(201).json({ data: populated });
  } catch (err) {
    console.error("Error creating comment", err);
    res
      .status(500)
      .json({ message: "Failed to create comment", error: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "20", 10);

    const skip = (page - 1) * limit;

    const comments = await Models.Comment.find({ postId })
      .populate("userId", "userName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({ data: comments });
  } catch (err) {
    console.error("Error fetching comments", err);
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: err.message });
  }
};

export default {
  createComment,
  getComments,
};
