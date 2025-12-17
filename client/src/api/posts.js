const baseUrl = "http://localhost:5000/api";

// Posts
export const createPost = async (user, content) => {
  try {
    const response = await fetch(`${baseUrl}/user/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        content,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (err) {
    console.error("Error creating post", err);
    throw err;
  }
};
export const getPosts = async () => {
  try {
    const response = await fetch(`${baseUrl}/posts`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (err) {
    console.error("Error getting posts", err);
    throw err;
  }
};

// Likes
export const likePost = async (postId, userId) => {
  try {
    const response = await fetch(`${baseUrl}/post/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error liking post", err);
    throw err;
  }
};
