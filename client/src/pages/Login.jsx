import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(userName, password);
    if (response.success) {
      navigate("/home");
    } else {
      console.log("Login failed:", response.message);
    }
  };

  return (
    <div>
      <div>Login</div>
      <form name="login" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
