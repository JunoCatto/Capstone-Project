import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
// MUI imports
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  let [passHelperText, setPassHelperText] = useState("");
  let [userHelperText, setUserHelperText] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const handleMouseUpPassword = (e) => {
    e.preventDefault();
  };

  // Validation as user types
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUserName(value);

    if (value.length > 0 && value.length < 3) {
      setUserHelperText("Username must be at least 3 characters");
    } else if (value.length > 20) {
      setUserHelperText("Username must be less than 20 characters");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value) && value.length > 0) {
      setUserHelperText(
        "Username can only contain letters, numbers, and underscores"
      );
    } else {
      setUserHelperText("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    let hasError = false;
    // Username validation
    if (!userName) {
      setUserHelperText("Username is required");
      hasError = true;
    } else if (userName.length < 3) {
      setUserHelperText("Username must be at least 3 characters");
      hasError = true;
    } else if (userName.length > 20) {
      setUserHelperText("Username must be less than 20 characters");
      hasError = true;
    } else if (!/^[a-zA-Z0-9_]+$/.test(userName)) {
      setUserHelperText(
        "Username can only contain letters, numbers, and underscores"
      );
      hasError = true;
    } else {
      setUserHelperText("");
    }

    // Password Validation
    if (!password) {
      setPassHelperText("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPassHelperText("Password must be at least 6 characters");
      hasError = true;
    } else {
      setPassHelperText("");
    }

    if (hasError) return;

    const result = await register(userName, password);

    // add feedback to the user
    if (result.success) {
      navigate("/");
    } else if (result.message === "Username already exists") {
      setUserHelperText("This username is already taken");
    } else {
      alert(result.message || "Registration failed");
    }
  };

  return (
    <div className="authContainer">
      <div className="auth">
        <form name="login" onSubmit={handleRegister}>
          <h1>Register</h1>
          {/* Username */}
          <FormControl className="input">
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput
              error={!!userHelperText}
              id="username"
              value={userName}
              onChange={handleUsernameChange}
              label="username"
            />
            {userHelperText && (
              <FormHelperText error>{userHelperText}</FormHelperText>
            )}
          </FormControl>
          {/* Password */}
          <FormControl className="input">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              error={!!passHelperText}
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
            {passHelperText && (
              <FormHelperText error>{passHelperText}</FormHelperText>
            )}
          </FormControl>
          <Button variant="outlined" type="submit">
            {" "}
            Register{" "}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
