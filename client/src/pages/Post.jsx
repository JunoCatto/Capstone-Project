import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { getPost, getComments, createComment } from "../api/posts.js";
import { profilePicUrl, getProfilePic } from "../utils/imageHelper.js";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Post() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const p = await getPost(id, user);
      setPost(p);
      const c = await getComments(id, user);
      setComments(c);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const newComment = await createComment(id, text, user);
      setComments((s) => [newComment, ...s]);
      setText("");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post not found</p>;

  const postDate = new Date(post.createdAt);
  const date = postDate.toLocaleDateString("en-UK", {
    month: "short",
    day: "numeric",
  });
  const time = postDate.toLocaleTimeString("en-UK", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="postPage">
      <div className="postCard" style={{ margin: "10px" }}>
        <div className="postHeader">
          <img src={profilePicUrl(post.userId._id)} alt="pfp" />
          <div>
            <h3>{post.userId.userName}</h3>
            <span>
              {date} | {time}
            </span>
          </div>
        </div>
        <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
        <div className="postStats">
          <span>{post.likes} likes</span>
          <span>{post.commentsCount ?? 0} comments</span>
        </div>
      </div>

      <div className="postInner">
        <form onSubmit={handleSubmit} className="commentForm">
          <img
            src={getProfilePic(user.profilePic) || profilePicUrl(user._id)}
            alt="you"
            style={{ width: 36, height: 36, borderRadius: "50%" }}
          />
          <TextField
            autoFocus
            variant="standard"
            placeholder="What's on your mind?"
            multiline
            maxRows={6}
            fullWidth
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            slotProps={{
              input: {
                inputProps: {},
                disableUnderline: true,
              },
            }}
          />
          <div className="mainPostButton">
            <Button
              type="submit"
              sx={{
                px: "12px !important",
                py: "4px !important",
              }}
            >
              Reply
            </Button>
          </div>
        </form>
      </div>

      <div className="commentsList">
        {comments.length === 0 && <div>No comments yet</div>}
        {comments.map((c) => {
          const commentDate = new Date(c.createdAt);
          const cdate = commentDate.toLocaleDateString("en-UK", {
            month: "short",
            day: "numeric",
          });
          const ctime = commentDate.toLocaleTimeString("en-UK", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
          return (
            <div key={c._id} className="commentItem">
              <img src={profilePicUrl(c.userId._id)} alt="pfp" />
              <div>
                <strong>{c.userId.userName}</strong>
                <div style={{ whiteSpace: "pre-wrap" }}>{c.content}</div>
                <small>
                  {cdate} | {ctime}
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
