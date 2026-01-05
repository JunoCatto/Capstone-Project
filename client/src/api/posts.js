// Posts
export const createPost = async (content, user) => {
  try {
    const response = await fetch(`/api/user/post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
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
export const getPosts = async (user) => {
  try {
    const response = await fetch(`/api/posts`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.error("Error getting posts", err);
    throw err;
  }
};

// Likes
export const likePost = async (postId, user) => {
  try {
    const response = await fetch(`/api/post/${postId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.error("Error liking post", err);
    throw err;
  }
};

export const getPost = async (postId, user) => {
  try {
    const response = await fetch(`/api/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data.data;
  } catch (err) {
    console.error("Error getting post", err);
    throw err;
  }
};

export const getComments = async (postId, user, page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `/api/post/${postId}/comments?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data.data;
  } catch (err) {
    console.error("Error getting comments", err);
    throw err;
  }
};

export const createComment = async (postId, content, user) => {
  try {
    const response = await fetch(`/api/post/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data.data;
  } catch (err) {
    console.error("Error creating comment", err);
    throw err;
  }
};
