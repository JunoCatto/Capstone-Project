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
