// Frontend/vite-project/src/Components/PropertyForm/PropertyForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Listings from '../Listing/Listings';
import './PropertyForm.css';
import Mainnavbar from '../Mainnav/Mainnavbar';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormGroup,
  FormControlLabel,
  Grid,
  Typography,
  Paper,
  Chip,
  Snackbar,
  Box,
  Alert,
  IconButton,
  FormHelperText,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

// Features array
const features = [
  'WiFi', 'Kitchen', 'Pool', 'Gym',
  'Air Conditioning', 'Workspace', 'Washing Machine',
  "Pet-Friendly Space", "Lush Garden", "Swimming Pool", "Mountain View",
  "Ocean View", "Heating", "Parking",
  "Washer/Dryer", "Fireplace", "Hot Tub",
  "TV"
];

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    selectedCategory: '',
    category: '',
    address: {
      street: '',
      apartment: '',
      landmark: '',
      country: '',
      city: '',
      state: '',
    },
    essentialInfo: {
      guests: 1,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
    },
    selectedFeatures: [],
    photos: [],
    charmInfo: {
      title: '',
      description: '',
      listingType: 'rent',
      price: { amount: 0, currency: 'INR' },
    },
    owner: {
      name: '',
      phone: '',
      email: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [photoFiles, setPhotoFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    if (keys.length === 1) {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else if (keys.length === 2) {
      setFormData(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value
        }
      }));
    } else if (keys.length === 3) {
      setFormData(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: {
            ...prev[keys[0]][keys[1]],
            [keys[2]]: value
          }
        }
      }));
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : Number(value);

    if (name === 'charmInfo.price') {
      setFormData(prev => ({
        ...prev,
        charmInfo: {
          ...prev.charmInfo,
          price: {
            ...prev.charmInfo.price,
            amount: numValue
          }
        }
      }));
    } else {
      handleChange(e);
    }
  };

  const handleFeaturesChange = (event, newFeatures) => {
    setFormData(prev => ({
      ...prev,
      selectedFeatures: newFeatures
    }));
  };

  const handleCategorySelection = (category) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedCategory: category,
      category: category,
    }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotoFiles((prevFiles) => [...prevFiles, ...files]);
    setFormData((prevData) => ({
      ...prevData,
      photos: [...prevData.photos, ...files],
    }));
  };

  const removePhoto = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove)
    }));
    setPhotoFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const submissionData = new FormData();

      // Append the selected category
      submissionData.append('category', formData.category);
      submissionData.append('selectedCategory', formData.selectedCategory);

      // Append address fields
      Object.entries(formData.address).forEach(([key, value]) =>
        submissionData.append(`address.${key}`, value)
      );

      // Append essentialInfo fields
      Object.entries(formData.essentialInfo).forEach(([key, value]) =>
        submissionData.append(`essentialInfo.${key}`, value)
      );

      // Append selected features
      formData.selectedFeatures.forEach((feature, index) =>
        submissionData.append(`selectedFeatures[${index}]`, feature)
      );

      // Append charmInfo fields
      Object.entries(formData.charmInfo).forEach(([key, value]) => {
        if (key === 'price') {
          submissionData.append('charmInfo.price.amount', formData.charmInfo.price.amount);
          submissionData.append('charmInfo.price.currency', formData.charmInfo.price.currency);
        } else {
          submissionData.append(`charmInfo.${key}`, value);
        }
      });

      // Append owner fields
      Object.entries(formData.owner).forEach(([key, value]) =>
        submissionData.append(`owner.${key}`, value)
      );

      // Append photos
      photoFiles.forEach((file) => submissionData.append('photos', file));

      // Send POST request with FormData
      const response = await axios.post(
        'https://just-home.onrender.com/properties',
        submissionData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      console.log('Property created:', response.data);
      setMessage({ text: 'Property listing created successfully!', type: 'success' });

      // Reset form after successful submission
      setFormData({
        selectedCategory: '',
        category: '',
        address: { street: '', apartment: '', landmark: '', country: '', city: '', state: '' },
        essentialInfo: { guests: 1, bedrooms: 1, bathrooms: 1, beds: 1 },
        selectedFeatures: [],
        photos: [],
        charmInfo: { title: '', description: '', listingType: 'rent', price: { amount: 0, currency: 'INR' } },
        owner: { name: '', phone: '', email: '' },
      });
      setPhotoFiles([]);
    } catch (error) {
      console.error('Error creating listing:', error);
      if (error.response) {
        console.error('Server Response:', error.response.data);
      }
      setMessage({
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Mainnavbar />
      <Box sx={{ padding: 3 }}>
        <Listings onSelectCategory={handleCategorySelection} />

        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <form onSubmit={handleSubmit}>
            {/* Success/Error Message */}
            {message.text && (
              <Box
                sx={{
                  padding: 2,
                  marginBottom: 2,
                  backgroundColor: message.type === 'success' ? '#e8f5e9' : '#ffebee',
                  borderRadius: 1
                }}
              >
                <Typography color={message.type === 'success' ? 'success' : 'error'}>
                  {message.text}
                </Typography>
              </Box>
            )}

            {/* Step 1: Property Category */}
            <Paper elevation={1} sx={{ padding: 2, marginBottom: 3 }}>
              <Typography variant="h5" gutterBottom>Property Category</Typography>
              <TextField
                fullWidth
                label="Selected Category"
                variant="outlined"
                name="selectedCategory"
                value={formData.selectedCategory}
                InputProps={{ readOnly: true }}
                margin="normal"
              />
            </Paper>

            {/* Step 2: Property Address */}
            <Paper elevation={1} sx={{ padding: 2, marginBottom: 3 }}>
              <Typography variant="h5" gutterBottom>Property Address</Typography>
              <TextField
                fullWidth
                label="Street Address*"
                variant="outlined"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Apartment/Suite (optional)"
                variant="outlined"
                name="address.apartment"
                value={formData.address.apartment}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Landmark (optional)"
                variant="outlined"
                name="address.landmark"
                value={formData.address.landmark}
                onChange={handleChange}
                margin="normal"
              />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Country*"
                    variant="outlined"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="City*"
                    variant="outlined"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="State/Province*"
                    variant="outlined"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Step 3: Essential Information */}
            {/* Step 3: Essential Information */}
<Paper elevation={1} sx={{ padding: 2, marginBottom: 3, borderRadius: '8px' }}>
  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50', mb: 2 }}>
    Essential Information
  </Typography>
  <Grid container spacing={3}>
    <Grid item xs={12} sm={3}>
      <TextField
        fullWidth
        label="Guests*"
        variant="outlined"
        type="number"
        name="essentialInfo.guests"
        value={formData.essentialInfo.guests}
        onChange={handleChange}
        InputProps={{
          inputProps: { min: 1 },
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                  if (formData.essentialInfo.guests > 1) {
                    setFormData(prev => ({
                      ...prev,
                      essentialInfo: {
                        ...prev.essentialInfo,
                        guests: prev.essentialInfo.guests - 1
                      }
                    }));
                  }
                }}
                size="small"
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                -
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    essentialInfo: {
                      ...prev.essentialInfo,
                      guests: prev.essentialInfo.guests + 1
                    }
                  }));
                }}
                size="small"
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                +
              </IconButton>
            </InputAdornment>
          )
        }}
        required
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#3f51b5',
            },
          }
        }}
      />
    </Grid>
    <Grid item xs={12} sm={3}>
      <TextField
        fullWidth
        label="Bedrooms*"
        variant="outlined"
        type="number"
        name="essentialInfo.bedrooms"
        value={formData.essentialInfo.bedrooms}
        onChange={handleChange}
        InputProps={{
          inputProps: { min: 1 },
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                  if (formData.essentialInfo.bedrooms > 1) {
                    setFormData(prev => ({
                      ...prev,
                      essentialInfo: {
                        ...prev.essentialInfo,
                        bedrooms: prev.essentialInfo.bedrooms - 1
                      }
                    }));
                  }
                }}
                size="small"
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                -
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    essentialInfo: {
                      ...prev.essentialInfo,
                      bedrooms: prev.essentialInfo.bedrooms + 1
                    }
                  }));
                }}
                size="small"
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                +
              </IconButton>
            </InputAdornment>
          )
        }}
        required
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#3f51b5',
            },
          }
        }}
      />
    </Grid>
    <Grid item xs={12} sm={3}>
      <TextField
        fullWidth
        label="Bathrooms*"
        variant="outlined"
        type="number"
        name="essentialInfo.bathrooms"
        value={formData.essentialInfo.bathrooms}
        onChange={handleChange}
        InputProps={{
          inputProps: { min: 1 },
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                  if (formData.essentialInfo.bathrooms > 1) {
                    setFormData(prev => ({
                      ...prev,
                      essentialInfo: {
                        ...prev.essentialInfo,
                        bathrooms: prev.essentialInfo.bathrooms - 1
                      }
                    }));
                  }
                }}
                size="small"
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                -
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    essentialInfo: {
                      ...prev.essentialInfo,
                      bathrooms: prev.essentialInfo.bathrooms + 1
                    }
                  }));
                }}
                size="small"
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                +
              </IconButton>
            </InputAdornment>
          )
        }}
        required
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#3f51b5',
            },
          }
        }}
      />
    </Grid>
    <Grid item xs={12} sm={3}>
      <TextField
        fullWidth
        label="Beds*"
        variant="outlined"
        type="number"
        name="essentialInfo.beds"
        value={formData.essentialInfo.beds}
        onChange={handleChange}
        InputProps={{
          inputProps: { min: 1 },
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                  if (formData.essentialInfo.beds > 1) {
                    setFormData(prev => ({
                      ...prev,
                      essentialInfo: {
                        ...prev.essentialInfo,
                        beds: prev.essentialInfo.beds - 1
                      }
                    }));
                  }
                }}
                size="small"
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                -
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    essentialInfo: {
                      ...prev.essentialInfo,
                      beds: prev.essentialInfo.beds + 1
                    }
                  }));
                }}
                size="small"
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                +
              </IconButton>
            </InputAdornment>
          )
        }}
        required
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#3f51b5',
            },
          }
        }}
      />
    </Grid>
  </Grid>
</Paper>

            {/* Step 4: Property Features with ToggleButtons */}
            <Paper elevation={1} sx={{ padding: 2, marginBottom: 3 }}>
              <Typography variant="h5" gutterBottom>Property Features</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select all features that your property offers
              </Typography>

              <ToggleButtonGroup
                value={formData.selectedFeatures}
                onChange={handleFeaturesChange}
                aria-label="property features"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 1,
                  width: '100%'
                }}
                multiple
              >
                {features.map((feature) => (
                  <ToggleButton
                    key={feature}
                    value={feature}
                    sx={{
                      margin: '4px',
                      
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                        }
                      }
                    }}
                  >
                    {feature}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>

              {formData.selectedFeatures.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Selected Features ({formData.selectedFeatures.length}):
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {formData.selectedFeatures.map((feature) => (
                      <Chip
                        key={feature}
                        label={feature}
                        color="primary"
                        variant="outlined"
                        onDelete={() => {
                          setFormData(prev => ({
                            ...prev,
                            selectedFeatures: prev.selectedFeatures.filter(f => f !== feature)
                          }));
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Paper>

            {/* Step 5: Property Photos */}
            <Paper elevation={1} sx={{ padding: 2, marginBottom: 3 }}>
              <Typography variant="h5" gutterBottom>Property Photos</Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<PhotoCamera />}
                sx={{ marginBottom: 2 }}
              >
                Upload Photos
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  hidden
                />
              </Button>

              {formData.photos.length > 0 && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {formData.photos.map((photo, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Box sx={{ position: 'relative' }}>
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Property ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 0, 0, 0.1)',
                            }
                          }}
                          onClick={() => removePhoto(index)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>

            {/* Step 6: Property Details */}
            <Paper elevation={1} sx={{ padding: 2, marginBottom: 3 }}>
              <Typography variant="h5" gutterBottom>Property Details</Typography>
              <TextField
                fullWidth
                label="Title*"
                variant="outlined"
                name="charmInfo.title"
                value={formData.charmInfo.title}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description*"
                variant="outlined"
                name="charmInfo.description"
                value={formData.charmInfo.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
                margin="normal"
              />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="listing-type-label">Listing Type*</InputLabel>
                    <Select
                      labelId="listing-type-label"
                      label="Listing Type*"
                      name="charmInfo.listingType"
                      value={formData.charmInfo.listingType}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="rent">For Rent</MenuItem>
                      <MenuItem value="sale">For Sale</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={formData.charmInfo.listingType === 'rent' ? 'Price per day*' : 'Sale Price*'}
                    variant="outlined"
                    name="charmInfo.price"
                    type="number"
                    value={formData.charmInfo.price.amount}
                    onChange={handleNumberChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                      inputProps: { min: 0 }
                    }}
                    required
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Step 7: Owner Information */}
            <Paper elevation={1} sx={{ padding: 2, marginBottom: 3 }}>
              <Typography variant="h5" gutterBottom>Owner Information</Typography>
              <TextField
                fullWidth
                label="Name*"
                variant="outlined"
                name="owner.name"
                value={formData.owner.name}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone*"
                variant="outlined"
                name="owner.phone"
                value={formData.owner.phone}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email*"
                variant="outlined"
                name="owner.email"
                type="email"
                value={formData.owner.email}
                onChange={handleChange}
                required
                margin="normal"
              />
            </Paper>

            {/* Form Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isLoading}
                sx={{ minWidth: 200 }}
              >
                {isLoading ? 'Creating Listing...' : 'Create Listing'}
              </Button>

            </Box>

            {/* Success Popup */}
      <Snackbar
        open={successMessage}
        autoHideDuration={3000} // Auto-close after 3 sec
        onClose={() => setSuccessMessage(false)}
      >
        <Alert severity="success" onClose={() => setSuccessMessage(false)}>
          Property added successfully!
        </Alert>
      </Snackbar>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default PropertyForm;