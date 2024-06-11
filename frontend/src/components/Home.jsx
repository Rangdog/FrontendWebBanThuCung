import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import AxiosInstance from "./AxiosInstante";

const Home = () => {
  const [maKhachHang, setMaKhachHang] = useState("");
  const [products, setProducts] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branches, setBranches] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterePets, setFilteredPets] = useState([]);

  const addToCartPets = async (id) => {
    try {
      await AxiosInstance.post("/center/gio-hang/them-thu-cung", {
        maKhachHang: maKhachHang,
        maThuCung: id,
      });
      alert("Đã thêm thú cưng vào giỏ hàng!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng!");
    }
  };

  const addToCartProducts = async (id) => {
    try {
      await AxiosInstance.post("/center/gio-hang/them-san-pham", {
        maKhachHang: maKhachHang,
        maSanPham: id,
        maChiNhanh: selectedBranch,
      });
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng!");
    }
  };

  useEffect(() => {
    const maKhachHang = localStorage.getItem("tenDangNhap");
    if (maKhachHang) {
      setMaKhachHang(maKhachHang);
    }
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await AxiosInstance.get("/center/chinhanh");
        console.log("Branches Data:", response.data);
        setBranches(response.data);
        if (response.data.length > 0) {
          setSelectedBranch(response.data[0].maChiNhanh);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await AxiosInstance.get("/center/ct-san-pham");
        console.log("Products Data:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchPets = async () => {
      try {
        const response = await AxiosInstance.get("/center/ct-thu-cung");
        console.log("Pets Data:", response.data);
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchProducts();
    fetchPets();
  }, []);

  useEffect(() => {
    if (selectedBranch !== null) {
      // Filter products based on selected branch
      const filtered1 = products.filter(
        (product) => product.maChiNhanh === parseInt(selectedBranch)
      );
      setFilteredProducts(filtered1);

      const filtered2 = pets.filter(
        (pets) => pets.maChiNhanh === parseInt(selectedBranch)
      );
      setFilteredPets(filtered2);
    }
  }, [selectedBranch, products, pets]);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  return (
    <Container>
      <FormControl fullWidth margin="normal">
        <InputLabel id="branch-select-label">Chọn Chi Nhánh</InputLabel>
        <Select
          labelId="branch-select-label"
          id="branch-select"
          value={selectedBranch}
          label="Chọn Chi Nhánh"
          onChange={handleBranchChange}
        >
          {branches.map((branch) => (
            <MenuItem key={branch.maChiNhanh} value={branch.maChiNhanh}>
              {branch.tenChiNhanh}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h5" component="h2" gutterBottom>
        Sản Phẩm
      </Typography>
      <Grid container spacing={3} paddingTop={1}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.maSanPham}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Link
                to={`/product/${product.maSanPham}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.hinhAnh}
                  alt={product.tenSanPham}
                />
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="h6" component="div">
                    {product.tenSanPham}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {product.tenLoaiSanPham}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {product.giaKhuyenMai ? (
                      <>
                        <Typography variant="body2" color="error">
                          {product.giaKhuyenMai} VND
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: "line-through", marginLeft: 1 }}
                        >
                          {product.giaHienTai} VND
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body2" color="text.primary">
                        {product.giaHienTai} VND
                      </Typography>
                    )}
                  </Box>

                  <Typography variant="body2" color="text.primary">
                    Số lượng tồn: {product.soLuongTon}
                  </Typography>
                </CardContent>
              </Link>
              <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <Button
                  size="small"
                  onClick={() => addToCartProducts(product.maSanPham)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom marginTop={4}>
        Thú Cưng
      </Typography>
      <Grid container spacing={3} paddingTop={1}>
        {filterePets.map((pet) => (
          <Grid item xs={12} sm={6} md={3} key={pet.maThuCung}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Link
                to={`/product/${pet.maThuCung}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={pet.hinhAnh}
                  alt={pet.tenThuCung}
                />
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="h6" component="div">
                    {pet.tenThuCung}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {pet.tenGiong}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {pet.giaKhuyenMai ? (
                      <>
                        <Typography variant="body2" color="error">
                          {pet.giaKhuyenMai} VND
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: "line-through", marginLeft: 1 }}
                        >
                          {pet.giaHienTai} VND
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body2" color="text.primary">
                        {pet.giaHienTai} VND
                      </Typography>
                    )}
                  </Box>

                  <Typography variant="body2" color="text.primary">
                    Số lượng tồn: {pet.soLuongTon}
                  </Typography>
                </CardContent>
              </Link>
              <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <Button
                  size="small"
                  onClick={() => addToCartPets(pet.maThuCung)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
