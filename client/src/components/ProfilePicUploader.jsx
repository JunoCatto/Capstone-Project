import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { uploadProfilePic } from "../api/users.js";

// MUI button
import Button from "@mui/material/Button";

export default function ProfilePicUploader() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };
  // Breaks if the image is too large or a weird size. Need to implement resizer
  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const updated = await uploadProfilePic(user._id, file, user);
      // update local storage and reload to refresh JWT payload/state
      const flat = {
        _id: updated._id,
        userName: updated.userName,
        profilePic: updated.profilePic,
        token: user.token,
      };
      localStorage.setItem("user", JSON.stringify(flat));
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <input
        id="profilePicInput"
        className="profilePicUploader"
        type="file"
        accept="image/*"
        onChange={onFile}
      />
      <label
        htmlFor="profilePicInput"
        className="profilePicLabel"
        role="button"
        tabIndex={0}
      >
        {file ? file.name : "Choose file"}
      </label>
      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
      )}
      <div className="mainPostButton" style={{ display: "flex", gap: 8 }}>
        <Button
          className="profilePicLabel"
          disabled={!file || loading}
          onClick={handleUpload}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
        <Button
          className="profilePicLabel"
          onClick={() => {
            setFile(null);
            setPreview(null);
          }}
        >
          Cancel
        </Button>
      </div>
      {error && <div style={{ color: "#e74c49ff" }}>{error}</div>}
    </div>
  );
}
