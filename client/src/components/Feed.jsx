export default function Feed({ posts, loading, error }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="feed">
      {posts.map((post, index) => (
        <div className="feedPosts" key={post._id || index}>
          <div className="feedInnerDiv">
            <p>{post.content}</p>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
