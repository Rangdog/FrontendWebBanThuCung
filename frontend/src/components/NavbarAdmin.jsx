import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import PetsIcon from '@mui/icons-material/Pets';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SpaIcon from '@mui/icons-material/Spa';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link, useLocation} from 'react-router-dom';
const drawerWidth = 240;

export default function NavbarAdmin(props) {
    const {content} = props
    const location  =  useLocation()
    const path = location.pathname
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem key={1} disablePadding>
                <ListItemButton component = {Link} to = "/admin" selected={"/admin" === path} >
                  <ListItemIcon>
                   <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý Tài khoản"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={2} disablePadding>
                <ListItemButton component = {Link} to = "/admin/nhanvien" selected={"/admin/nhanvien" === path}>
                  <ListItemIcon>
                   <BadgeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý nhân viên"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={3} disablePadding>
                <ListItemButton component = {Link} to = "/admin/chinhanh" selected={"/admin/chinhanh" === path}>
                  <ListItemIcon>
                   <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý chi nhánh"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={12} disablePadding>
                <ListItemButton component = {Link} to = "/admin/thucung" selected={"/admin/thucung" === path}>
                  <ListItemIcon>
                   <PriceChangeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý thú cưng"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={13} disablePadding>
                <ListItemButton component = {Link} to = "/admin/sanpham" selected={"/admin/sanpham" === path}>
                  <ListItemIcon>
                   <PriceChangeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý sản phẩm"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={4} disablePadding>
                <ListItemButton component = {Link} to = "/admin/banggia" selected={"/admin/banggia" === path}>
                  <ListItemIcon>
                   <PriceChangeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý giá"} />
                </ListItemButton>
              </ListItem>
    
              <ListItem key={6} disablePadding>
                <ListItemButton component = {Link} to = "/admin/loaisp" selected={"/admin/loaisp" === path}>
                  <ListItemIcon>
                   <Inventory2Icon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý loại"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={7} disablePadding>
                <ListItemButton component = {Link} to = "/admin/loaithucung" selected={"/admin/loaithucung" === path}>
                  <ListItemIcon>
                   <PetsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý loài"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={8} disablePadding>
                <ListItemButton component = {Link} to = "/admin/giong" selected={"/admin/giong" === path}>
                  <ListItemIcon>
                   <SpaIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý giông"} />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          <List>
        
              <ListItem key={9} disablePadding>
                <ListItemButton component = {Link} to = "/admin/nhaphang" selected={"/admin/nhaphang" === path}>
                  <ListItemIcon>
                     <CategoryIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Nhập hàng"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={10} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                     <InboxIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Xem danh thu"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={11} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                     <LogoutIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Đăng xuất"} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
            {content}
      </Box>
    </Box>
  );
}
