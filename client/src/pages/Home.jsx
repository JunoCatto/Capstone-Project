import Feed from "../components/Feed.jsx";
import PostInput from "../components/PostInput.jsx";
import { useState, useEffect } from "react";
import { getPosts } from "../api/posts.js";
import { useAuth } from "../hooks/useAuth.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(user);
        setPosts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [user]);

  const addImmediately = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Listen for posts created elsewhere (e.g. PostModal from Sidebar)
  useEffect(() => {
    const handler = (e) => {
      const newPost = e.detail;
      if (newPost) addImmediately(newPost);
    };
    window.addEventListener("postCreated", handler);
    return () => window.removeEventListener("postCreated", handler);
  }, []);

  return (
    <div className="feedPosts">
      <PostInput addImmediately={addImmediately} />
      <Feed posts={posts} loading={loading} error={error} />
    </div>
  );
}
