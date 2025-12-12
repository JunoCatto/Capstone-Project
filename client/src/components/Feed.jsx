export default function Feed({ posts, loading, error }) {
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
              <div>{post.author}</div>
              <p>{post.content}</p>
              <span>
                {date} | {time}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
