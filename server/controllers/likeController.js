import Models from "../models/index.js";

export const likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    if (!userId || !postId) {
      return res
        .status(400)
        .json({ message: "userId and postId are required" });
    }
    const like = new Models.Like({
      userId,
      postId,
    });
    await like.save();
    // update post like count
    const post = await Models.Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ likeCount: post.likes, liked: true });
  } catch (err) {
    if (err.code === 11000) {
      // if duplicate like, unlike the post
      await Models.Like.deleteOne({ userId, postId });
      const post = await Models.Post.findByIdAndUpdate(
        postId,
        {
          $inc: { likes: -1 },
        },
        { new: true }
      );
      return res.status(200).json({ likeCount: post.likes, liked: false });
    }
    res
      .status(500)
      .json({ message: "Failed to create like", error: err.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }
    const likes = await Models.Like.find({ postId }).populate(
      "userId",
      "userName"
    );
    res.status(200).json({ data: likes });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch likes", error: err.message });
  }
};

export default {
  likePost,
  getLikes,
};
