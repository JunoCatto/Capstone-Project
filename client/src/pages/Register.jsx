import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  // style alerts properly
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      alert("Please fill both fields");
      return;
    }
    if (password.length < 6) {
      alert("Passwords must be at least 6 characters.");
      // add more conditions here?
      return;
    }
    const response = await register(userName, password);
    if (response.success) {
      navigate("/");
    } else {
      console.log("Registration failed:", response.message);
      alert("That username is taken.");
    }
  };

  return (
    <div className="maincontainer">
      <div className="container">
        <h1>Register</h1>
        <form name="register" onSubmit={handleRegister}>
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
