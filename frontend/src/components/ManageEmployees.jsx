import React,{ useState, useEffect, useRef} from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper, FormControl,InputLabel,MenuItem, Select} from '@mui/material';


const SearchBar = () => {
  return (
    <div>
      <TextField label="Search" variant="outlined" />
      <Button variant="contained">Search</Button>
    </div>
  );
};

const EmployeeDetailDialog = ({ open, onClose, employee }) => {
    if (!employee) {
        return null; // Nếu không có thông tin nhân viên, không hiển thị Dialog
      }
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Thông tin chi tiết nhân viên</DialogTitle>
        <DialogContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">Mã nhân viên:</TableCell>
                <TableCell>{employee.maNhanVien}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ textAlign: 'center' }}><img src={employee.hinhAnh} alt={employee.maNhanVien}  style={{ maxWidth: '100%', maxHeight: '100%' }}/></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Họ và tên:</TableCell>
                <TableCell>{`${employee.ho} ${employee.ten}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">CCCD:</TableCell>
                <TableCell>{employee.cccd}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Chức vụ:</TableCell>
                <TableCell>{employee.chucVu}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Số điện thoại:</TableCell>
                <TableCell>{employee.soDienThoai}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Email:</TableCell>
                <TableCell>{employee.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Ma chi nhánh:</TableCell>
                <TableCell>{employee.maChiNhanh}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    );
  };

const RegistrationForm = ({ open, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const chucVu = watch('chucVu', '');
  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm nhân viên</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <FormControl fullWidth margin="dense">
                <InputLabel id="taikhoan-label">Tài khoản</InputLabel>
                <Select
                labelId="taikhoan-label"
                value={chucVu}
                onChange={(e) => setValue('chucVu', e.target.value)}
                label="Chức vụ"
                >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="quanly">Quản lý</MenuItem>
                <MenuItem value="nhanvien">Nhân viên</MenuItem>
                </Select>
            </FormControl>
          <TextField
            margin="dense"
            label="Mã nhân viên"
            fullWidth
            {...register("maNhanVien", { required: true })}
            error={!!errors.ho}
            helperText={errors.ho ? "Mã nhân viên là bắt buộc" : ""}
          />
          <TextField
            margin="dense"
            label="Họ"
            fullWidth
            {...register("ho", { required: true })}
            error={!!errors.ten}
            helperText={errors.ten ? "Họ là bắt buộc" : ""}
          />
          <TextField
            margin="dense"
            label="Tên"
            fullWidth
            {...register("ten", { required: true })}
            error={!!errors.tenDangNhap}
            helperText={errors.tenDangNhap ? "Tên là bắt buộc" : ""}
          />
          <TextField
            margin="dense"
            label="CCCD"
            fullWidth
            {...register("cccd", { required: true })}
            error={!!errors.matKhau}
            helperText={errors.matKhau ? "CCCD là bắt buộc" : ""}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="chucVu-label">Chức vụ</InputLabel>
            <Select
              labelId="chucVu-label"
              value={chucVu}
              onChange={(e) => setValue('chucVu', e.target.value)}
              label="Chức vụ"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="quanly">Quản lý</MenuItem>
              <MenuItem value="nhanvien">Nhân viên</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Số điện thoại"
            fullWidth
            {...register("soDienThoai", { required: true })}
            error={!!errors.soDienThoai}
            helperText={errors.soDienThoai ? "Số điện thoại là bắt buộc" : ""}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email ? "Email là bắt buộc" : ""}
          />
          <TextField
            margin="dense"
            label="Mã chi nhánh"
            fullWidth
            {...register("maChiNhanh", { required: true })}
            error={!!errors.email}
            helperText={errors.email ? "Mã chi nhánh là bắt buộc" : ""}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit(handleFormSubmit)} variant="contained">Đăng ký</Button>
      </DialogActions>
    </Dialog>
  );
};

const ManageEmployees = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
    const tableRef = useRef(null);
  // Assume pets data is available in pets array
  const employees = [
    { maNhanVien: "NV1", ho: "Vũ Văn", ten: "Lâm", cccd: "1234567890", chucVu: "admin", soDienThoai: "0917", email: "lamvu", maChiNhanh: 1, hinhAnh: null },
    { maNhanVien: "NV2", ho: "Trần Gia", ten: "Long", cccd: "12345678910", chucVu: "quanly", soDienThoai: "0917", email: "gialong", maChiNhanh: 1, hinhAnh: null },
    { maNhanVien: "NV3", ho: "Đoàn Ngọc", ten: "Tài", cccd: "987654321", chucVu: "nhanvien", soDienThoai: "0917", email: "ngoctai", maChiNhanh: 2, hinhAnh: null },
    { maNhanVien: "NV4", ho: "Hà Xuân", ten: "Thanh", cccd: "10987654321", chucVu: "nhanvien", soDienThoai: "0917", email: "xuanthanh", maChiNhanh: 2, hinhAnh: null }
  ];
// Hàm xử lý khi chọn một hàng
    const handleRowClick = (index) => {
        if (selectedEmployee == index){
            setSelectedEmployee(null);
        }
        else{
            setSelectedEmployee(index);
        }
  };

  // Hàm xử lý khi ấn vào nút Edit
  const handleEdit = () => {
    // Thực hiện hành động edit với thông tin của hàng được chọn
    setIsDetailDialogOpen(true);
  };

  // Hàm xử lý khi ấn vào nút Delete
  const handleDelete = () => {
    // Thực hiện hành động delete với thông tin của hàng được chọn
    if(selectedEmployee !== null) {
      const selectedPet = pets[selectedEmployee];
      // Thực hiện hành động delete với selectedPet
      console.log("Delete pet:", selectedPet);
    }
  };
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = (data) => {
    console.log("Form Data:", data);
    // Handle form submission
    handleDialogClose();
  };

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
  };
  const ActionButtons = ({ onEdit, onDelete, isDisabled,onOpenDialog  }) => {
    return (
      <div>
        <Button variant="contained" color="primary" style={{marginRight: '10px'}} onClick={onOpenDialog}>Thêm nhân viên</Button>
        <Button variant="contained" color="primary" style={{marginRight: '10px'}} onClick={onEdit} disabled={isDisabled} >Xem chi tiết</Button>
      </div>
    );
  };
//   const handleDeselect = () => {
//     setSelectedUserIndex(null);
//   };

  return (
    <>
        <SearchBar/>
        <ActionButtons onEdit={handleEdit} onDelete={handleDelete} onOpenDialog={handleDialogOpen} isDisabled={selectedEmployee === null}/>
        <EmployeeDetailDialog
        open={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        employee={employees[selectedEmployee]}
        />
        <RegistrationForm open={isDialogOpen} onClose={handleDialogClose} onSubmit={handleFormSubmit} />
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }} ref={tableRef}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    <TableCell>Mã nhân viên</TableCell>
                    <TableCell>Hình ảnh</TableCell>
                    <TableCell>Họ tên</TableCell>
                    <TableCell>Chức vụ</TableCell>
                    <TableCell>Chi nhánh</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee, index) => (
                        <TableRow key={index}
                            onClick={() => handleRowClick(index)}
                            sx={{ backgroundColor: selectedEmployee === index ? "#f0f0f0" : "inherit" }}
                        >
                            <TableCell>{employee.maNhanVien}</TableCell>
                            <TableCell>{employee.hinhAnh}</TableCell>
                            <TableCell>{employee.ho + " " + employee.ten}</TableCell>
                            <TableCell>{employee.chucVu}</TableCell>
                            <TableCell>{employee.maChiNhanh}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
        </Paper>
    </>
  );
};

export default ManageEmployees;





