import { useState } from "react";
import { likePost } from "../api/posts";
import { profilePicUrl } from "../utils/imageHelper";
import { useAuth } from "../hooks/useAuth";
// Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Feed({ posts, loading, error }) {
  const [localPosts, setLocalPosts] = useState([]);

  const { user } = useAuth();

  const handleLike = async (postId) => {
    try {
      const result = await likePost(postId, user._id);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="feed">
      {posts.map((post, index) => {
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
          <div className="feedPosts" key={post._id || index}>
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
              <p>{post.content}</p>
              <div onClick={() => handleLike(post._id)}>
                <FavoriteBorderIcon /> {post.likes}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
