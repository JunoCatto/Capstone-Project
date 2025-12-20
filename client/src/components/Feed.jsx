import { profilePicUrl } from "../utils/imageHelper";
// Icons
import LikeButton from "./LikeButton.jsx";
import CommentButton from "./commentButton.jsx";

export default function Feed({ posts, loading, error }) {
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
          <div className="feedPosts" key={post._id}>
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
              <div className="feedLowerDiv">
                <CommentButton />
                <LikeButton
                  postId={post._id}
                  initialLikes={post.likes}
                  initialLiked={post.liked}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
