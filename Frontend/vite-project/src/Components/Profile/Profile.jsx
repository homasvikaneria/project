// Frontend/vite-project/src/Components/Profile/Profile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

const EditProfile = () => {
    const navigate = useNavigate();
    
    // Add these new states
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    
    // Get userId from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        role: "",
        profileImage: null,
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        if (!token || !userId) {
            alert("Please login again");
            navigate('/login');
            return;
        }

        // Update the API URL in useEffect
        axios.get(`http://localhost:8000/users/email/${user.email}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        .then((res) => {
            if (res.data) {
                const userData = res.data;
                setFormData(prev => ({
                    ...prev,
                    name: userData.name || "",
                    surname: userData.surname || storedUser.surname || "",
                    email: userData.email || "",
                    phoneNumber: storedUser.phoneNumber || userData.phoneNumber || "",
                    address: storedUser.address || userData.address || "",
                    role: userData.role || "",
                    password: ""
                }));

                // Update the image handling in useEffect
                if (userData.profileImagePath) {
                    const imagePath = userData.profileImagePath.startsWith('http') 
                        ? userData.profileImagePath 
                        : `http://localhost:8000/uploads/${userData.profileImagePath}`;
                    setPreviewImage(imagePath);
                } else if (storedUser.profilePicture) {
                    setPreviewImage(storedUser.profilePicture);
                }

                // ... and update the image rendering in return section:
                <div className="profile-image-container">
                    <img 
                        src={previewImage || "/assets/images/default-profile.jpg"} 
                        alt="Profile" 
                        className="profile-image"
                        onError={(e) => {
                            const fallbackImage = "/assets/images/default-profile.jpg";
                            if (e.target.src !== window.location.origin + fallbackImage) {
                                e.target.src = fallbackImage;
                            }
                            e.target.onerror = null;
                        }}
                    />
                </div>

                // ... and in handleSubmit:
                if (response.data.profileImagePath) {
                    const updatedImagePath = `http://localhost:8000/uploads/${response.data.profileImagePath}`;
                    setPreviewImage(updatedImagePath);
                    updatedUser.profilePicture = updatedImagePath;
                }
            }
        })
        .catch((err) => {
            // If API fails, at least show data from localStorage
            if (storedUser) {
                setFormData(prev => ({
                    ...prev,
                    name: storedUser.name || "",
                    surname: storedUser.surname || "",
                    email: storedUser.email || "",
                    phoneNumber: storedUser.phoneNumber || "",
                    address: storedUser.address || "",
                    role: storedUser.role || "",
                    password: ""
                }));
            }
            
            console.error("Error fetching user data:", err);
            if (err.response?.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        });
    }, [userId, navigate, user.email]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profileImage: file });
        setPreviewImage(URL.createObjectURL(file));
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    // In the handleSubmit function, update the formDataToSend section
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formDataToSend = new FormData();

        // Add form fields
        formDataToSend.append("name", formData.name);
        formDataToSend.append("surname", formData.surname);
        formDataToSend.append("email", formData.email);
        // Ensure phone number and address are sent even if empty
        formDataToSend.append("phoneNumber", formData.phoneNumber || "");
        formDataToSend.append("address", formData.address || "");
        formDataToSend.append("role", formData.role);

        // Add password fields if changing password
        if (passwordData.newPassword) {
            formDataToSend.append("oldPassword", passwordData.oldPassword);
            formDataToSend.append("newPassword", passwordData.newPassword);
        }

        // Only append password if it's not empty
        if (formData.password) {
            formDataToSend.append("password", formData.password);
        }

        // Add profile image if exists
        if (formData.profileImage) {
            formDataToSend.append("profileImage", formData.profileImage);
        }

        // In handleSubmit function, remove the userData reference
        try {
            const response = await axios.patch(
                `http://localhost:8000/users/update/${userId}`,
                formDataToSend,
                {
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
        
            // Update preview image using response data instead
            if (response.data.profileImagePath) {
                setPreviewImage(`http://localhost:8000/uploads/${response.data.profileImagePath}`);
            }
        
            if (response.data) {
                const updatedUser = { 
                    ...user, 
                    ...response.data,
                    surname: formData.surname,
                    phoneNumber: formData.phoneNumber || "",
                    address: formData.address || ""
                };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                
                alert("Profile updated successfully!");
                setIsEditing(false);
                window.location.reload();
            }
        } catch (error) {
            console.error("Profile update failed:", error);
            if (error.response?.status === 401) {
                alert("Session expired. Please login again.");
                localStorage.clear();
                navigate('/login');
            } else {
                alert(error.response?.data?.message || "Error updating profile");
            }
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-image-container">
                    <img 
                        src={previewImage || "/images/default-avatar.png"} 
                        alt="Profile" 
                        className="profile-image"
                        onError={(e) => {
                            console.log("Loading fallback image");
                            if (!e.target.src.includes('default-avatar.png')) {
                                e.target.src = "/images/default-avatar.png";
                            }
                            e.target.onerror = null;
                        }}
                    />
                </div>
                <h2>{formData.name} {formData.surname}</h2>
                <span className="user-role">{formData.role}</span>
            </div>

            {!isEditing ? (
                <div className="profile-info">
                    <div className="info-group">
                        <label>Email:</label>
                        <p>{formData.email}</p>
                    </div>
                    <div className="info-group">
                        <label>Phone Number:</label>
                        <p>{formData.phoneNumber}</p>
                    </div>
                    <div className="info-group">
                        <label>Address:</label>
                        <p>{formData.address}</p>
                    </div>
                    <button 
                        className="edit-button"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="edit-form" encType="multipart/form-data">
                    <div className="form-group">
                        <label>Profile Image:</label>
                        <input 
                            type="file" 
                            name="profileImage" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            disabled
                            className="readonly-input"
                            style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Surname:</label>
                        <input 
                            type="text" 
                            name="surname" 
                            value={formData.surname} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input 
                            type="tel" 
                            name="phoneNumber" 
                            value={formData.phoneNumber} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Address:</label>
                        <textarea 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Password Management:</label>
                        <div className="password-section">
                            <div className="form-group">
                                <label>Current Password:</label>
                                <div className="password-field">
                                    <input 
                                        type={showOldPassword ? "text" : "password"}
                                        name="oldPassword" 
                                        value={passwordData.oldPassword} 
                                        onChange={handlePasswordChange}
                                    />
                                    <IconButton
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        className="password-toggle"
                                    >
                                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>New Password:</label>
                                <div className="password-field">
                                    <input 
                                        type={showNewPassword ? "text" : "password"}
                                        name="newPassword" 
                                        value={passwordData.newPassword} 
                                        onChange={handlePasswordChange}
                                    />
                                    <IconButton
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="password-toggle"
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Confirm New Password:</label>
                                <div className="password-field">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword" 
                                        value={passwordData.confirmPassword} 
                                        onChange={handlePasswordChange}
                                    />
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="password-toggle"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="save-button">Save Changes</button>
                        <button 
                            type="button" 
                            className="cancel-button"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditProfile;
