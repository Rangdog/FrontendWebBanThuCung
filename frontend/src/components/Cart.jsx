import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "./Footer"; // Điều chỉnh đường dẫn import tùy theo cấu trúc của dự án

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      category: "Category A",
      price: 10,
      quantity: 2,
      image:
        "https://paddy.vn/cdn/shop/files/60_e750b790-06c9-45c1-b5b2-31144f75054d.jpg?v=1711944034",
    },
    {
      id: 2,
      name: "Product 2",
      category: "Category B",
      price: 15,
      quantity: 1,
      image:
        "https://paddy.vn/cdn/shop/products/hat-royal-canin-hairball-tieu-bui-long-cho-meo-paddy-6.jpg?v=1693241941",
    },
    // Add more items as needed
  ]);

  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://your-api-url/cart");
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      selected: isChecked,
    }));
    setCartItems(updatedCartItems);
    setSelectAll(isChecked);
  };

  const handleItemCheckboxChange = (id, isChecked) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, selected: isChecked } : item
    );
    setCartItems(updatedCartItems);
    setSelectAll(updatedCartItems.every((item) => item.selected));
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: quantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDeleteItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    setSelectAll(updatedCartItems.every((item) => item.selected));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.selected) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 2, marginBottom: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Giỏ Hàng
      </Typography>
      {cartItems.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30vh",
          }}
        >
          <Typography variant="h5">Không có sản phẩm trong giỏ hàng</Typography>
        </Box>
      ) : (
        <>
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
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={item.selected || false}
                      onChange={(event) =>
                        handleItemCheckboxChange(item.id, event.target.checked)
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
        </>
      )}
      <Footer />
    </Container>
  );
}

export default Cart;
