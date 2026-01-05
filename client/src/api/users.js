const baseUrl = "http://localhost:5000/api";

export const getUser = async (userId, user) => {
  try {
    const response = await fetch(`${baseUrl}/user/${userId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to get user");
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

    const response = await fetch(`${baseUrl}/user/${userId}/pic`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: base64, contentType }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to upload");
    return data.data;
  } catch (err) {
    console.error("Error uploading profile pic", err);
    throw err;
  }
};
