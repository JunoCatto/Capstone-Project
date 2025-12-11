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

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, error } = useAuth();

  // Handling password visibility (repeated code at the moment, will fix later)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const handleMouseUpPassword = (e) => {
    e.preventDefault();
  };

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
    await register(userName, password);
    if (!error) {
      navigate("/");
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
          </Button>
        </form>
      </div>
    </div>
  );
};
//   return (
//     <div className="maincontainer">
//       <div className="container">
//         <h1>Register</h1>
//         <form name="register" onSubmit={handleRegister}>
//           <input
//             type="text"
//             placeholder="userName"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// };

export default Register;
