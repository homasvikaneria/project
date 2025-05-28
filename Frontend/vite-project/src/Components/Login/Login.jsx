// just_home/Frontend/vite-project/src/Components/Login/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/state";
import { FcGoogle } from "react-icons/fc";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css"; // Import CSS for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      setError("Request timed out. Please try again.");
      setIsLoading(false);
    }, 10000); // Reduced to 10 seconds

    try {
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed. Please try again.");
      }

      const loggedIn = await response.json();

      if (loggedIn?.user && loggedIn?.token) {
        const { _id, id, email, profilePicture, name, role } = loggedIn.user;
        const userData = {
          _id: _id || id,
          email,
          profilePicture: profilePicture || '/default-avatar.png',
          name,
          role,
          isAuthenticated: true,
          lastLogin: new Date().toISOString()
        };
        
        // Validate profile picture URL
        if (userData.profilePicture && !userData.profilePicture.startsWith('http')) {
          userData.profilePicture = `http://localhost:8000${userData.profilePicture}`;
        }
        
        // Batch localStorage operations
        const storageData = {
          user: JSON.stringify(userData),
          token: loggedIn.token,
          userId: userData._id
        };
        
        Object.entries(storageData).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        
        dispatch(setLogin({ user: userData, token: loggedIn.token }));
        navigate("/", { replace: true });
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Connection timed out. Please check your internet connection.');
      } else {
        setError(err.message || 'An error occurred during login.');
      }
      localStorage.clear();
    } finally {
      setIsLoading(false);
      clearTimeout(timeoutId);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Grid container className="login-container">
      <Paper elevation={10} className="login-paper">
        <Grid align="center">
          <Typography variant="h5" className="login-title">
            Login
          </Typography>
        </Grid>

        {/* Google Login Button */}
        <div className="google-signup">
          <FcGoogle className="google-icon" />
          Login with Google
        </div>

        {/* OR Divider */}
        <Divider className="divider">OR</Divider>

        {/* Form */}
        {error && (
          <Typography color="error" align="center" style={{ margin: '10px 0' }}>
            {error}
          </Typography>
        )}
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            fullWidth
            required
            margin="normal"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            margin="normal"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button
            type="submit"
            variant="outlined"
            className="login-btn"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Sign-up Link */}
        <Typography align="center" className="login-footer">
          Didn't have an account? <Link to="/register">Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
