import ProfilePicUploader from "../components/ProfilePicUploader.jsx";
import { useAuth } from "../hooks/useAuth.jsx";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="profilePage">
      <h3 className="profileHeader">{user.userName}'s profile</h3>
      <div>
        <h4>Profile Picture</h4>
        <ProfilePicUploader />
      </div>
    </div>
  );
}
