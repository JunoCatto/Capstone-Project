const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Posts
export const createPost = async (content, user) => {
  try {
    const response = await fetch(`${API_URL}/user/post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Error creating post", err);
    throw err;
  }
};

export const deletePost = async (postId, user) => {
  try {
    const response = await fetch(`${API_URL}/user/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Error deleting post", err);
    throw err;
  }
};

export const updatePost = async (postId, content, user) => {
  try {
    const response = await fetch(`${API_URL}/user/post/${postId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Error updating post", err);
    throw err;
  }
};

export const getPosts = async (user) => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    // If the response is not OK, read as text
    if (!response.ok) {
      let errorMsg;
      try {
        const errData = await response.clone().json();
        errorMsg = errData.message || JSON.stringify(errData);
      } catch {
        // Fallback to text
        errorMsg = await response.text();
      }
      throw new Error(`Failed to fetch posts: ${errorMsg}`);
    }
    const data = await response.json();
    return data.data || data; // depends on backend shape
  } catch (err) {
    console.error("Error getting posts", err);
    throw err;
  }
};

// Likes
export const likePost = async (postId, user) => {
  try {
    const response = await fetch(`${API_URL}/post/${postId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    });
    if (!response.ok) {
      throw new Error(data.message);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error liking post", err);
    throw err;
  }
};

export const getPost = async (postId, user) => {
  try {
    const response = await fetch(`${API_URL}/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (!response.ok) throw new Error(data.message);
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Error getting post", err);
    throw err;
  }
};

export const getComments = async (postId, user, page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `${API_URL}/post/${postId}/comments?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (!response.ok) throw new Error(data.message);
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Error getting comments", err);
    throw err;
  }
};

export const createComment = async (postId, content, user) => {
  try {
    const response = await fetch(`${API_URL}/post/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) throw new Error(data.message);
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Error creating comment", err);
    throw err;
  }
};
