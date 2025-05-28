// just_home/Frontend/vite-project/src/Components/Register/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Paper, TextField, Button, Typography, Avatar, IconButton } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { MdUpload } from "react-icons/md";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.name || !formData.surname || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required!");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("surname", formData.surname);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }

    try {
      const response = await fetch("https://just-home.onrender.com/users/register", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        setError(result.message || "Registration Failed");
      }
    } catch (error) {
      setError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container className="register-container">
      <Paper elevation={10} className="register-paper">
        <Grid align="center">
          <Typography variant="h5" className="register-title">
            Sign Up
          </Typography>
        </Grid>

        {/* Google Sign Up Button */}
        <div className="google-signup">
          <FcGoogle className="google-icon" />
          Sign up with Google
        </div>

        {/* OR Divider */}
        <div className="or-divider">OR</div>

        {error && <Typography color="error" align="center">{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="First Name" name="name" fullWidth required value={formData.name} onChange={handleChange} className="register-input" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Last Name" name="surname" fullWidth required value={formData.surname} onChange={handleChange} className="register-input" />
            </Grid>
          </Grid>

          <TextField label="Email Address" name="email" fullWidth required margin="normal" value={formData.email} onChange={handleChange} className="register-input" />
          <TextField label="Password" name="password" type="password" fullWidth required margin="normal" value={formData.password} onChange={handleChange} className="register-input" />
          <TextField label="Confirm Password" name="confirmPassword" type="password" fullWidth required margin="normal" value={formData.confirmPassword} onChange={handleChange} className="register-input" />

          {/* Profile Image Upload */}
          <Grid container direction="column" alignItems="center" className="upload-container">
            <input type="file" id="image" name="profileImage" accept="image/*" hidden onChange={handleFileChange} />
            <label htmlFor="image">
              <IconButton component="span" className="upload-box">
                {imagePreview ? <Avatar src={imagePreview} sx={{ width: "100%", height: "100%" }} /> : <MdUpload className="upload-icon" />}
              </IconButton>
            </label>
            <Typography variant="caption" className="upload-text">
              {imagePreview ? "Change Image" : "Upload Profile Picture"}
            </Typography>
          </Grid>

          <Button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? "Registering..." : "Sign Up"}
          </Button>
        </form>

<Typography align="center" className="login-footer">
          Already have an account <Link to="/login">Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Register;
