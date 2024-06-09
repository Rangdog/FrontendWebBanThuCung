import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Autocomplete,
} from "@mui/material";
import axios from "axios";

const Order = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: "path/to/image1",
      name: "Sản phẩm 1",
      type: "Loại 1",
      price: 50000,
      quantity: 2,
    },
    {
      id: 2,
      image: "path/to/image2",
      name: "Sản phẩm 2",
      type: "Loại 2",
      price: 30000,
      quantity: 1,
    },
    // Thêm các sản phẩm khác nếu cần
  ]);

  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => {
        setProvinces(response.data.data);
        setLoadingProvinces(false);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
        setLoadingProvinces(false);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      setLoadingDistricts(true);
      axios
        .get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince.id}.htm`)
        .then((response) => {
          setDistricts(response.data.data);
          setWards([]);
          setLoadingDistricts(false);
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
          setLoadingDistricts(false);
        });
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      setLoadingWards(true);
      axios
        .get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict.id}.htm`)
        .then((response) => {
          setWards(response.data.data);
          setLoadingWards(false);
        })
        .catch((error) => {
          console.error("Error fetching wards:", error);
          setLoadingWards(false);
        });
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom marginTop={2}>
        Xác nhận đơn hàng
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Thông tin giao hàng:</Typography>
            <TextField fullWidth label="Họ và tên" margin="normal" />
            <TextField fullWidth label="Số điện thoại" margin="normal" />
            <Box display="flex" marginBottom="16px">
              <Autocomplete
                options={provinces}
                getOptionLabel={(option) => option.full_name}
                value={selectedProvince}
                onChange={(event, newValue) => {
                  setSelectedProvince(newValue);
                  setSelectedDistrict(null);
                  setSelectedWard(null);
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tỉnh/Thành phố"
                    variant="outlined"
                    margin="normal"
                    disabled={loadingProvinces}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingProvinces ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                style={{ marginRight: "10px" }}
              />
              <Autocomplete
                options={districts}
                getOptionLabel={(option) => option.full_name}
                value={selectedDistrict}
                onChange={(event, newValue) => {
                  setSelectedDistrict(newValue);
                  setSelectedWard(null);
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Quận/Huyện"
                    variant="outlined"
                    margin="normal"
                    disabled={!selectedProvince || loadingDistricts}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingDistricts ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                style={{ marginRight: "10px" }}
              />
              <Autocomplete
                options={wards}
                getOptionLabel={(option) => option.full_name}
                value={selectedWard}
                onChange={(event, newValue) => setSelectedWard(newValue)}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Phường/Xã"
                    variant="outlined"
                    margin="normal"
                    disabled={!selectedDistrict || loadingWards}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingWards ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Box>
            <TextField fullWidth label="Địa chỉ cụ thể" margin="normal" />
            <Typography variant="h6">Phương thức thanh toán</Typography>
            <Typography>Thanh toán khi nhận hàng</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              maxHeight: "400px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">Sản phẩm đã chọn</Typography>
            <Box
              style={{ flexGrow: 1, overflow: "auto", marginBottom: "10px" }}
            >
              <List>
                {cartItems.map((item) => (
                  <ListItem key={item.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        src={item.image}
                        variant="square"
                        style={{ width: 80, height: 80 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" marginLeft={2}>
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            marginLeft={2}
                          >
                            Loại: {item.type}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            marginLeft={2}
                          >
                            Đơn giá: {item.price.toLocaleString()}đ
                          </Typography>
                        </>
                      }
                    />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      padding={3}
                    >
                      Số lượng: {`x${item.quantity}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      padding={3}
                    >
                      Thành tiền:{" "}
                      {`${(item.price * item.quantity).toLocaleString()}đ`}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box style={{ borderTop: "1px solid #ddd", paddingTop: "10px" }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">
                  Tổng cộng: {calculateTotal().toLocaleString()}đ
                </Typography>
                <Button variant="contained" color="warning">
                  Đặt hàng
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Order;
