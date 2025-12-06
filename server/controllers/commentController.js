import Models from "../models/index.js";

export const createComment = async (req, res) => {
  try {
    const comment = new Models.Comment(req.body);
    const savedComment = await comment.save();
    res.send({ result: "success", data: savedComment });
    console.log(
      "comment created with successfully, comment id is ",
      savedComment._id
    );
  } catch (err) {
    res.send({ result: "failed", data: err });
    console.log(err);
  }
};

export default {
  createComment,
};
