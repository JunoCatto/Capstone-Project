import { profilePicUrl } from "../utils/imageHelper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
// mui loading spinner
import LoadingSpinner from "./LoadingSpinner.jsx";
// Icons
import LikeButton from "./LikeButton.jsx";
import CommentButton from "./CommentButton.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Feed({ posts, loading, error, deletePostHandler }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  // add loading ring
  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="feed">
      {posts.map((post) => {
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
          <div className="feedPosts" key={post._id}>
            <div
              className="feedInnerDiv"
              onClick={() => navigate(`/post/${post._id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="feedHeader">
                <div className="feedPfp">
                  <img src={profilePicUrl(post.userId._id)}></img>
                </div>
                <h4>{post.userId.userName}</h4>
                <span>
                  {date} | {time}
                </span>
                {/* delete button that is only active if the user is the post author */}
                {user._id === post.userId._id && (
                  <DeleteIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePostHandler(post._id);
                    }}
                  />
                )}
                {/* update button that is only active if the user is the post author */}
                {user._id === post.userId._id && (
                  <EditIcon onClick={(e) => e.stopPropagation()} />
                )}
              </div>
              <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {/* pre-wrap to preserve line breaks, wordBreak to break words */}
                {post.content}
              </p>
              <div className="feedLowerDiv">
                <span className="feedStats">
                  <CommentButton initialComments={post.commentsCount} />
                </span>
                <span className="feedStats">
                  <LikeButton
                    postId={post._id}
                    initialLikes={post.likes}
                    initialLiked={post.liked}
                  />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
