const API_URL = import.meta.env.VITE_API_URL;
// Gets from base64 of user schema
export const getProfilePic = (profilePic) => {
  if (!profilePic || !profilePic.data) {
    return null;
  }
  let base64Data;

  if (typeof profilePic.data === "string") {
    base64Data = profilePic.data;
  } else if (
    profilePic.data.type === "Buffer" &&
    Array.isArray(profilePic.data.data)
  ) {
    const bytes = new Uint8Array(profilePic.data.data);
    base64Data = btoa(String.fromCharCode.apply(null, bytes));
  }
  const contentType = profilePic.contentType || "image/png";
  return `data:${contentType};base64,${base64Data}`;
};
// Profile pictures for feed
export const profilePicUrl = (userId) => {
  return `${API_URL}/user/${userId}/pic`;
};
