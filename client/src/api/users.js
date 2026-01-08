const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const getUser = async (userId, user) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (!response.ok) throw new Error(data.message || "Failed to get user");
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Error getting user", err);
    throw err;
  }
};

export const uploadProfilePic = async (userId, file, user) => {
  try {
    // convert file to base64
    const toBase64 = (f) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(f);
      });

    const base64 = await toBase64(file);
    const contentType = file.type || "image/png";

    const response = await fetch(`${API_URL}/user/${userId}/pic`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: base64, contentType }),
    });
    if (!response.ok) throw new Error(data.message || "Failed to upload");
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Error uploading profile pic", err);
    throw err;
  }
};
