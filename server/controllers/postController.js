import Models from "../models/index.js";

export const createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;
    if (!userId || !content) {
      return res.status(400).json({ data: err });
    }
    const post = new Models.Post(req.body);
    const savedPost = await post.save();
    res.status(200).json({ data: savedPost });
    console.log(`New post of id: ${savedPost._id} created.`);
  } catch (err) {
    res.status(500).json({ data: err });
  }
};

// find all posts for feed
export const getPosts = async (req, res) => {
  try {
    const posts = await Models.Post.find().sort({ createdAt: -1 }); // sorts posts top to bottom by date
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};

export default {
  createPost,
  getPosts,
};
