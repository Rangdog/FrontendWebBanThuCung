import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Container,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";

const CustomerProfile = () => {
  const [profile, setProfile] = useState({
    username: "ngoktaimk",
    fullname: "Đoàn Ngọc Tài",
    email: "ng******@gmail.com",
    phone: "********28",
    gender: "male",
    day: "21",
    month: "8",
    year: "2002",
    id: "123456789",
  });

  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleGenderChange = (e) => {
    setProfile({
      ...profile,
      gender: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("profileData", JSON.stringify(profile));
    if (selectedImage) {
      formData.append("profileImage", selectedImage);
    }
    // Send formData to the server or handle it according to your requirements
  };

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h5">Hồ Sơ Của Tôi</Typography>
        <Typography variant="subtitle1">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </Typography>
      </Box>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tên đăng nhập"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              margin="normal"
              size="small"
            />
            <TextField
              fullWidth
              label="Họ và Tên"
              name="fullname"
              value={profile.fullname}
              onChange={handleInputChange}
              margin="normal"
              size="small"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              margin="normal"
              size="small"
            />
            <TextField
              fullWidth
              label="Số điện thoại"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              margin="normal"
              size="small"
            />
            <Box mb={2}>
              <FormLabel component="legend">Giới tính</FormLabel>
              <RadioGroup
                name="gender"
                value={profile.gender}
                onChange={handleGenderChange}
                row
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Nam"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Nữ"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Khác"
                />
              </RadioGroup>
            </Box>
            <Box mb={2}>
              <FormLabel component="legend">Ngày sinh</FormLabel>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Select
                    fullWidth
                    name="day"
                    value={profile.day}
                    onChange={handleInputChange}
                    size="small"
                  >
                    {[...Array(31).keys()].map((day) => (
                      <MenuItem key={day + 1} value={day + 1}>
                        {day + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <Select
                    fullWidth
                    name="month"
                    value={profile.month}
                    onChange={handleInputChange}
                    size="small"
                  >
                    {[...Array(12).keys()].map((month) => (
                      <MenuItem key={month + 1} value={month + 1}>
                        Tháng {month + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <Select
                    fullWidth
                    name="year"
                    value={profile.year}
                    onChange={handleInputChange}
                    size="small"
                  >
                    {[...Array(101).keys()].map((year) => (
                      <MenuItem key={1920 + year} value={1920 + year}>
                        {1920 + year}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="CCCD"
                name="id"
                value={profile.id}
                onChange={handleInputChange}
                margin="normal"
                size="small"
              />
            </Box>
            <Button
              variant="contained"
              style={{ backgroundColor: "orange" }}
              fullWidth
              onClick={handleSave}
            >
              Lưu
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box mb={2}>
              <img
                src={profileImage}
                alt="Profile"
                style={{ width: 150, height: 150, borderRadius: "50%" }}
              />
            </Box>
            <Button
              variant="contained"
              component="label"
              style={{ backgroundColor: "orange" }}
            >
              Chọn Ảnh
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              mt={2}
            >
              Dung lượng file tối đa 1 MB
              <br />
              Định dạng: .JPEG, .PNG
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CustomerProfile;
