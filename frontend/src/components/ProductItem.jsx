import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CardMedia,
  Button,
  Box,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import Slider from "react-slick";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AxiosInstance from "./AxiosInstante";
import { useParams } from "react-router-dom";

// Custom styled component for strikethrough text
const StrikeThroughText = styled(Typography)({
  textDecoration: "line-through",
  marginRight: "8px",
});

const ProductItem = () => {
  const { id } = useParams(); // Assuming you are using React Router for routing
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await AxiosInstance.get(`/center/sanpham/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="div" gutterBottom>
            {product.tenSanPham}
          </Typography>
          <Box display="flex" alignItems="center" marginBottom={2}>
            {product.giaKhuyenMai ? (
              <>
                <StrikeThroughText variant="h6" color="textSecondary">
                  {product.giaHienTai} VND
                </StrikeThroughText>
                <Typography variant="h6" color="error">
                  {product.giaKhuyenMai} VND
                </Typography>
              </>
            ) : (
              <Typography variant="h6">{product.giaHienTai} VND</Typography>
            )}
          </Box>
          <Typography variant="body1" gutterBottom>
            Loại sản phẩm: {product.loaiSanPham.tenLoaiSanPham}
          </Typography>
          <Box display="flex" alignItems="center" marginBottom={2}>
            <Typography variant="body1" marginRight={2}>
              Số lượng:
            </Typography>
            <IconButton
              aria-label="reduce"
              onClick={() => handleQuantityChange(-1)}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              value={quantity}
              inputProps={{ readOnly: true }}
              size="small"
              sx={{ width: "50px", textAlign: "center" }}
            />
            <IconButton
              aria-label="increase"
              onClick={() => handleQuantityChange(1)}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Button variant="contained" color="primary">
            Thêm vào giỏ hàng
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Slider {...settings}>
            {product.hinhAnh.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                height="300"
                image={image}
                alt={`${product.tenSanPham} ${index + 1}`}
              />
            ))}
          </Slider>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductItem;
