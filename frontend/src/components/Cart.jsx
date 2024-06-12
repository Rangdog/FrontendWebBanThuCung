import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Typography,
  Grid,
  Box,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Footer from "./Footer"; // Điều chỉnh đường dẫn import tùy theo cấu trúc của dự án
import AxiosInstance from "./AxiosInstante";

function Cart() {
  const [maKhachHang, setMaKhachHang] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const [cartPets, setCartPets] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branches, setBranches] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterePets, setFilteredPets] = useState([]);

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
    const fetchCartItems = async () => {
      if (maKhachHang && selectedBranch) {
        try {
          const responseProducts = await AxiosInstance.post(
            "/center/gio-hang/san-pham",
            {
              maKhachHang: maKhachHang,
              maChiNhanh: selectedBranch,
            }
          );

          const responsePets = await AxiosInstance.post(
            "/center/gio-hang/thu-cung",
            {
              maKhachHang: maKhachHang,
              maChiNhanh: selectedBranch,
            }
          );
          setCartPets(responsePets.data);
          setCartProducts(responseProducts.data);
          console.log(responseProducts.data);
          console.log(responsePets.data);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCartItems();
  }, [maKhachHang, selectedBranch]);

  useEffect(() => {
    if (selectedBranch !== null) {
      const filtered1 = cartProducts.filter(
        (product) => product.maChiNhanh === parseInt(selectedBranch)
      );
      setFilteredProducts(filtered1);

      console.log(filtered1);
    }
  }, [selectedBranch, cartProducts]);

  useEffect(() => {
    if (selectedBranch !== null) {
      const filtered2 = cartPets.filter(
        (pet) => pet.chiNhanh.maChiNhanh === parseInt(selectedBranch)
      );
      setFilteredPets(filtered2);
      console.log(filtered2);
    }
  }, [selectedBranch, cartPets]);

  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    setSelectedBranch(branchId);
    localStorage.setItem("maChiNhanh", branchId);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await AxiosInstance.post("/center/gio-hang/bo-san-pham", {
        maKhachHang: maKhachHang,
        maSanPham: id,
        maChiNhanh: selectedBranch,
      });
      alert("Đã xóa sản phẩm khỏi giỏ hàng!");

      const responseProducts = await AxiosInstance.post(
        "/center/gio-hang/san-pham",
        {
          maKhachHang: maKhachHang,
          maChiNhanh: selectedBranch,
        }
      );

      setCartProducts(responseProducts.data);
    } catch (error) {
      console.error("Error deleting to cart:", error);
      alert("Có lỗi xảy ra khi xóa sản phẩm!");
    }
  };

  const handleDeletePet = async (id) => {
    try {
      await AxiosInstance.post("/center/gio-hang/bo-thu-cung", {
        maKhachHang: maKhachHang,
        maThuCung: id,
      });
      alert("Đã xóa thú cưng khỏi giỏ hàng!");

      const responsePets = await AxiosInstance.post(
        "/center/gio-hang/thu-cung",
        {
          maKhachHang: maKhachHang,
          maChiNhanh: selectedBranch,
        }
      );

      setCartPets(responsePets.data);
    } catch (error) {
      console.error("Error deleting to cart:", error);
      alert("Có lỗi xảy ra khi xóa sản phẩm!");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 2, marginBottom: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Giỏ Hàng
      </Typography>
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
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <Box
          sx={{ width: "48%", border: "1px solid black", borderRadius: "5px" }}
        >
          <Typography variant="h6" align="center">
            Sản phẩm
          </Typography>
          {filteredProducts.length === 0 ? (
            <Typography variant="body1" align="center">
              Không có sản phẩm trong giỏ hàng
            </Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Hình ảnh</TableCell>
                  <TableCell>Sản Phẩm</TableCell>
                  <TableCell>Đơn Giá</TableCell>
                  <TableCell>Số Lượng tồn</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((item) => (
                  <TableRow key={item.maSanPham}>
                    <TableCell>
                      <img
                        src={item.hinhAnh}
                        alt={item.tenSanPham}
                        style={{ width: 50, height: 50 }}
                      />
                    </TableCell>
                    <TableCell>{item.tenSanPham}</TableCell>
                    <TableCell>
                      {item.giaKM ? item.giaKM : item.giaHienTai}
                    </TableCell>
                    <TableCell>{item.soLuongTon}</TableCell>

                    <TableCell>
                      <IconButton
                        onClick={() => handleDeleteProduct(item.maSanPham)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
        <Box
          sx={{ width: "48%", border: "1px solid black", borderRadius: "5px" }}
        >
          <Typography variant="h6" align="center">
            Thú cưng
          </Typography>
          {filterePets.length === 0 ? (
            <Typography variant="body1" align="center">
              Không có thú cưng trong giỏ hàng
            </Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Hình ảnh</TableCell>
                  <TableCell>Thú Cưng</TableCell>
                  <TableCell>Đơn Giá</TableCell>
                  <TableCell>Số Lượng Tồn</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {filterePets.map((item) => (
                  <TableRow key={item.maThuCung}>
                    <TableCell>
                      <img
                        src={item.hinhAnh}
                        alt={item.tenThuCung}
                        style={{ width: 50, height: 50 }}
                      />
                    </TableCell>
                    <TableCell>{item.tenThuCung}</TableCell>
                    <TableCell>
                      {item.giaKM ? item.giaKM : item.giaHienTai}
                    </TableCell>
                    <TableCell>{item.soLuongTon}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDeletePet(item.maThuCung)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
          zIndex: 1000,
          padding: 2,
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
          width: "100%",
        }}
      >
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            {filteredProducts.length > 0 || filterePets.length > 0 ? (
              <Link
                to={{
                  pathname: "/order",
                }}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="warning">
                  Đặt hàng
                </Button>
              </Link>
            ) : null}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
}

export default Cart;
