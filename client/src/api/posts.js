const baseUrl = "http://localhost:5000/api";

export const createPost = async (userId, content) => {
  try {
    const response = await fetch(`${baseUrl}/user/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        content,
      }),
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getPosts = async () => {
  try {
    const response = await fetch(`${baseUrl}/posts`);
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    return data.data;
  } catch (err) {
    throw new Error(err);
  }
};
