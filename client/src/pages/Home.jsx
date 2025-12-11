import Feed from "../components/Feed.jsx";
import PostInput from "../components/PostInput.jsx";
import { useState, useEffect } from "react";
import { getPosts } from "../api/posts.js";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const addImmediately = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="mainFeed">
      <PostInput addImmediately={addImmediately} />
      <h1>Home page!</h1>
      <Feed posts={posts} loading={loading} error={error} />
    </div>
  );
}
