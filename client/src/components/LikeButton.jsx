import { useState } from "react";
import { likePost } from "../api/posts";
import { useAuth } from "../hooks/useAuth";
// Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function LikeButton({ postId, initialLikes, initialLiked }) {
  const { user } = useAuth();
  const [serverState, setServerState] = useState({
    count: initialLikes,
    liked: initialLiked,
  });

  const handleLike = async () => {
    const newLiked = !serverState.liked;
    const newCount = (serverState.count ?? 0) + (newLiked ? 1 : -1);
    setServerState({ count: newCount, liked: newLiked });
    try {
      const result = await likePost(postId, user);
      setServerState({
        count: result.likeCount,
        liked: result.liked,
      });
    } catch (err) {
      console.error("Error liking post", err);
      setServerState({
        count: serverState.count,
        liked: serverState.liked,
      });
    }
  };
  return (
    <div className="likeButton">
      <div onClick={handleLike}>
        <div className="like">
          {serverState.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>
        <span style={{ color: "white" }}>{serverState.count}</span>
      </div>
    </div>
  );
}
