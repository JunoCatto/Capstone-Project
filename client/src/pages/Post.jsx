import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { getPost, getComments, createComment } from "../api/posts.js";
import { profilePicUrl, getProfilePic } from "../utils/imageHelper.js";
import LikeButton from "../components/LikeButton.jsx";
import CommentButton from "../components/CommentButton.jsx";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

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

  if (loading) return <LoadingSpinner />;
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
      <div className="postCard" style={{ margin: "16px" }}>
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
        <div className="feedLowerDiv">
          <span className="feedStats">
            <CommentButton initialComments={post.commentsCount} />
          </span>
          <span className="feedStats">
            {" "}
            <LikeButton
              postId={post._id}
              initialLikes={post.likes}
              initialLiked={post.liked}
            />
          </span>
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
              disabled={!text.trim()}
              sx={{
                px: "12px !important",
                py: "4px !important",
                textTransform: "none",
              }}
            >
              Reply
            </Button>
          </div>
        </form>
      </div>

      <div className="feed">
        {comments.length === 0 && (
          <div className="noComments">No comments yet</div>
        )}
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
            <div key={c._id} className="feedPosts">
              <div
                className="feedInnerDiv"
                style={{
                  cursor: "default",
                  borderTop: "1px solid #2f3336",
                  borderBottom: "0px",
                }}
              >
                <div className="feedHeader">
                  <div className="feedPfp">
                    <img src={profilePicUrl(c.userId._id)} alt="pfp" />
                  </div>
                  <h4>{c.userId.userName}</h4>
                  <span>
                    {cdate} | {ctime}
                  </span>
                </div>
                <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {/* pre-wrap to preserve line breaks, wordBreak to break words */}
                  {c.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
