import React, { useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";

// Giả định dữ liệu đơn hàng
const orders = [
  {
    id: 1,
    customerName: "Nguyễn Văn A",
    totalAmount: 500000,
    status: "paid", // Đã thanh toán
    items: [
      { id: 1, name: "Sản phẩm 1", price: 200000, quantity: 2 },
      { id: 2, name: "Sản phẩm 2", price: 150000, quantity: 1 },
    ],
  },
  {
    id: 2,
    customerName: "Trần Thị B",
    totalAmount: 800000,
    status: "unpaid", // Chưa thanh toán
    items: [
      { id: 3, name: "Sản phẩm 3", price: 300000, quantity: 1 },
      { id: 4, name: "Sản phẩm 4", price: 500000, quantity: 1 },
    ],
  },
  // Thêm đơn hàng khác nếu cần
];

const HistoryOrder = () => {
  const [filter, setFilter] = useState("all");

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Lịch sử đơn hàng
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="filter-label">Lọc theo trạng thái</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            value={filter}
            label="Lọc theo trạng thái"
            onChange={handleChangeFilter}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="paid">Đã thanh toán</MenuItem>
            <MenuItem value="unpaid">Chưa thanh toán</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {filteredOrders.map((order) => (
          <Grid item key={order.id} xs={12}>
            <Box
              sx={{
                border: 1,
                borderColor: "grey.300",
                padding: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6">
                Đơn hàng #{order.id} -{" "}
                {order.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
              </Typography>
              <Typography variant="body1">
                Khách hàng: {order.customerName}
              </Typography>
              <Typography variant="body1">
                Tổng giá trị: {order.totalAmount.toLocaleString()} VNĐ
              </Typography>
              <Typography variant="body2">Sản phẩm:</Typography>
              {order.items.map((item) => (
                <Typography key={item.id} variant="body2">
                  - {item.name}: {item.quantity} x {item.price.toLocaleString()}{" "}
                  VNĐ
                </Typography>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HistoryOrder;
