import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
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
import Footer from "./Footer"; // Điều chỉnh đường dẫn import tùy theo cấu trúc của dự án
import AxiosInstance from "./AxiosInstante";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartPets, setCartPets] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branches, setBranches] = useState([]);

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
      try {
        const responseProducts = await AxiosInstance.post(
          "/center/gio-hang/san-pham"
        );
        setCartProducts(responseProducts.data);

        const responsePets = await AxiosInstance.post(
          "/center/gio-hang/thu-cung"
        );
        setCartPets(responsePets.data);

        console.log(responseProducts.data);
        console.log(responsePets.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const updatedCartProducts = cartProducts.map((product) => ({
      ...product,
      selected: isChecked,
    }));
    setCartProducts(updatedCartProducts);
    setSelectAll(isChecked);
  };

  const handleItemCheckboxChange = (id, isChecked) => {
    const updatedCartProducts = cartProducts.map((product) =>
      product.id === id ? { ...product, selected: isChecked } : product
    );
    setCartProducts(updatedCartProducts);
    setSelectAll(updatedCartProducts.every((product) => product.selected));
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCartProducts = cartProducts.map((product) =>
      product.id === id ? { ...product, quantity: quantity } : product
    );
    setCartProducts(updatedCartProducts);
  };

  const handleDeleteItem = (id) => {
    const updatedCartProducts = cartProducts.filter(
      (product) => product.id !== id
    );
    setCartProducts(updatedCartProducts);
    setSelectAll(updatedCartProducts.every((product) => product.selected));
  };

  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => {
      if (product.selected) {
        return total + product.price * product.quantity;
      }
      return total;
    }, 0);
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
        <Box sx={{ width: "48%" }}>
          <Typography variant="h6" align="center">
            Sản phẩm
          </Typography>
          {cartProducts.length === 0 ? (
            <Typography variant="body1" align="center">
              Không có sản phẩm trong giỏ hàng
            </Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={selectAll}
                      onChange={handleCheckboxChange}
                    />
                  </TableCell>
                  <TableCell>Hình ảnh</TableCell>
                  <TableCell>Sản Phẩm</TableCell>
                  <TableCell>Loại Sản Phẩm</TableCell>
                  <TableCell>Đơn Giá</TableCell>
                  <TableCell>Số Lượng</TableCell>
                  <TableCell>Thành tiền</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {cartProducts.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={item.selected || false}
                        onChange={(event) =>
                          handleItemCheckboxChange(
                            item.id,
                            event.target.checked
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 50, height: 50 }}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </IconButton>
                      {item.quantity}
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </IconButton>
                    </TableCell>
                    <TableCell>{item.price * item.quantity}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteItem(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
        <Box sx={{ width: "48%" }}>
          <Typography variant="h6" align="center">
            Thú cưng
          </Typography>
          {cartPets.length === 0 ? (
            <Typography variant="body1" align="center">
              Không có thú cưng trong giỏ hàng
            </Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={selectAll}
                      onChange={handleCheckboxChange}
                    />
                  </TableCell>
                  <TableCell>Hình ảnh</TableCell>
                  <TableCell>Thú Cưng</TableCell>
                  <TableCell>Loại Thú Cưng</TableCell>
                  <TableCell>Đơn Giá</TableCell>
                  <TableCell>Số Lượng</TableCell>
                  <TableCell>Thành tiền</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {cartPets.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={item.selected || false}
                        onChange={(event) =>
                          handleItemCheckboxChange(
                            item.id,
                            event.target.checked
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 50, height: 50 }}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </IconButton>
                      {item.quantity}
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </IconButton>
                    </TableCell>
                    <TableCell>{item.price * item.quantity}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteItem(item.id)}>
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
            <Typography variant="h6">
              Tổng tiền: {calculateTotal()} đ
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="warning">
              Đặt hàng
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
}

export default Cart;
