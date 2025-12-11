export default function Feed({ posts, loading, error }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div>
        {posts.map((post, index) => (
          <div key={post._id || index}>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}
