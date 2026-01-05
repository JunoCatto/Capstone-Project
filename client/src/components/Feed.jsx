import { profilePicUrl } from "../utils/imageHelper";
import { useNavigate } from "react-router-dom";
// Icons
import LikeButton from "./LikeButton.jsx";
import CommentButton from "./CommentButton.jsx";

export default function Feed({ posts, loading, error }) {
  const navigate = useNavigate();
  // add loading ring
  if (loading) return <p>Loading...</p>;
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
          <div
            className="feedPosts"
            key={post._id}
            onClick={() => navigate(`/post/${post._id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="feedInnerDiv">
              <div className="feedHeader">
                <div className="feedPfp">
                  <img src={profilePicUrl(post.userId._id)}></img>
                </div>
                <h4>{post.userId.userName}</h4>
                <span>
                  {date} | {time}
                </span>
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
