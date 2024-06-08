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
                   <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý Tài khoản"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={2} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                   <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý nhân viên"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={3} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                   <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý chi nhánh"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={4} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                   <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý chi giá"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={5} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                   <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý loại"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={6} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                   <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý loài "} />
                </ListItemButton>
              </ListItem>

              <ListItem key={7} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                   <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quản lý giông"} />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          <List>
        
              <ListItem key={8} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                     <InboxIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Nhập hàng"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={9} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                     <InboxIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Xem danh thu"} />
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
