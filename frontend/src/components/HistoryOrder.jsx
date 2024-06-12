import React, { useEffect, useState } from "react";
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
import AxiosInstance from "./AxiosInstante";

const HistoryOrder = () => {
  const [orders, setOrders] = useState({});
  const [filter, setFilter] = useState("all");

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await AxiosInstance.get("/order/don-dat");
        console.log("Order Data:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchOrder();
  }, []);

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
