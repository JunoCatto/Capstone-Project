import { useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";

import { AuthContext } from "../context/authcontext.jsx";
export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.result === "success") {
      // save user for persistence
      localStorage.setItem("user", data.data.userName);
      // sets context for user
      setUser(data.data.userName);
      // add login confirmed
      console.log($`{data.data.userName} has logged in.`);
      navigate("/");
    } else {
      return console.log("User login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
}
