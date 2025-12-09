import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router";
// MUI imports
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// need to add validation for username and password. make reducer for states below
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  // Handling password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const handleMouseUpPassword = (e) => {
    e.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(userName, password);
    if (response.success) {
      navigate("/home");
    } else {
      console.log("Login failed:", response.message);
      setError(response.message);
    }
  };

  return (
    <div className="maincontainer">
      <div className="container">
        <form name="login" onSubmit={handleLogin}>
          <h1>Sign in to app(tm)</h1>
          {/* Username */}
          <FormControl className="input">
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              label="username"
            />
          </FormControl>
          {/* Password */}
          <FormControl className="input">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="password"
              endAdornment={
                <InputAdornment
                  position="end"
                  sx={{
                    paddingBottom: "18px",
                  }}
                >
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    sx={{
                      color: "white",
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button variant="outlined" type="submit">
            {" "}
            Login{" "}
          </Button>{" "}
          <Button variant="contained">Create an account</Button>
        </form>
      </div>
    </div>
  );
};
export default Login;
