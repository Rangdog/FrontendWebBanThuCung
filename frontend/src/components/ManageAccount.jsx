import React,{ useState, useEffect, useRef} from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper } from '@mui/material';

const AdminPanel = () => {
  return (
    <div>
      <SearchBar />
      <ActionButtons />
      <PetTable />
    </div>
  );
};

const SearchBar = () => {
  return (
    <div>
      <TextField label="Search" variant="outlined" />
      <Button variant="contained">Search</Button>
    </div>
  );
};

const RegistrationForm = ({ open, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Đăng ký tài khoản</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <TextField
            margin="dense"
            label="Họ"
            fullWidth
            {...register("ho", { required: true })}
            error={!!errors.ho}
            helperText={errors.ho ? "Họ là bắt buộc" : ""}
          />
          <TextField
            margin="dense"
            label="Tên"
            fullWidth
            {...register("ten", { required: true })}
            error={!!errors.ten}
            helperText={errors.ten ? "Tên là bắt buộc" : ""}
          />
          <TextField
            margin="dense"
            label="Tên đăng nhập"
            fullWidth
            {...register("tenDangNhap", { required: true })}
            error={!!errors.tenDangNhap}
            helperText={errors.tenDangNhap ? "Tên đăng nhập là bắt buộc" : ""}
          />
          <TextField
            margin="dense"
            label="Mật khẩu"
            type="password"
            fullWidth
            {...register("matKhau", { required: true })}
            error={!!errors.matKhau}
            helperText={errors.matKhau ? "Mật khẩu là bắt buộc" : ""}
          />
          <TextField
            margin="dense"
            label="CCCD"
            fullWidth
            {...register("cccd", { required: true })}
            error={!!errors.cccd}
            helperText={errors.cccd ? "CCCD là bắt buộc" : ""}
          />
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit(handleFormSubmit)} variant="contained">Đăng ký</Button>
      </DialogActions>
    </Dialog>
  );
};

const ManageAccount = () => {
    const [selectedPetIndex, setSelectedPetIndex] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const tableRef = useRef(null);
  // Assume pets data is available in pets array
  const account = [
    { tenDangNhap: "lamvu2010", matKhau: "123", quyen: "khachhang", trangThai: true, maXacNhan: null, thoiGianTaoMa: null, thoiGianHetHan: null, thoiGianXacNhan: null },
    { tenDangNhap: "NV1", matKhau: "123", quyen: "admin", trangThai: true, maXacNhan: null, thoiGianTaoMa: null, thoiGianHetHan: null, thoiGianXacNhan: null },
    { tenDangNhap: "NV2", matKhau: "123", quyen: "quanly", trangThai: true, maXacNhan: null, thoiGianTaoMa: null, thoiGianHetHan: null, thoiGianXacNhan: null },
    { tenDangNhap: "NV3", matKhau: "123", quyen: "nhanvien", trangThai: true, maXacNhan: null, thoiGianTaoMa: null, thoiGianHetHan: null, thoiGianXacNhan: null },
    { tenDangNhap: "NV4", matKhau: "123", quyen: "nhanvien", trangThai: true, maXacNhan: null, thoiGianTaoMa: null, thoiGianHetHan: null, thoiGianXacNhan: null }
    // Thêm các đối tượng người dùng khác nếu cần
  ];
// Hàm xử lý khi chọn một hàng
    const handleRowClick = (index) => {
        if (selectedPetIndex == index){
            setSelectedPetIndex(null);
        }
        else{
            setSelectedPetIndex(index);
        }
  };

  // Hàm xử lý khi ấn vào nút Edit
  const handleEdit = () => {
    // Thực hiện hành động edit với thông tin của hàng được chọn
    if(selectedPetIndex !== null) {
      const selectedPet = pets[selectedPetIndex];
      // Thực hiện hành động edit với selectedPet
      console.log("Edit pet:", selectedPet);
    }
  };

  // Hàm xử lý khi ấn vào nút Delete
  const handleDelete = () => {
    // Thực hiện hành động delete với thông tin của hàng được chọn
    if(selectedPetIndex !== null) {
      const selectedPet = pets[selectedPetIndex];
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
  const ActionButtons = ({ onEdit, onDelete, isDisabled,onOpenDialog  }) => {
    return (
      <div>
        <Button variant="contained" color="primary" style={{marginRight: '10px'}} onClick={onOpenDialog}>Đăng ký tài khoản</Button>
        <Button variant="contained" color="primary" style={{marginRight: '10px'}} onClick={onEdit} disabled={isDisabled}>Reset mật khẩu</Button>
        <Button variant="contained" color="secondary" onClick={onDelete} disabled={isDisabled}>Khóa tài khoản</Button>
      </div>
    );
  };
//   const handleDeselect = () => {
//     setSelectedUserIndex(null);
//   };

  // Xử lý sự kiện click ngoài bảng để bỏ chọn hàng
  useEffect(() => {
    const handleClickOutsideTable = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedPetIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideTable);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideTable);
    };
  }, []);
  return (
    <>
        <SearchBar/>
        <ActionButtons onEdit={handleEdit} onDelete={handleDelete} onOpenDialog={handleDialogOpen} isDisabled={selectedPetIndex === null}/>
        <RegistrationForm open={isDialogOpen} onClose={handleDialogClose} onSubmit={handleFormSubmit} />
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }} ref={tableRef}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    <TableCell>Tên đăng nhập</TableCell>
                    <TableCell>Quyền</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {account.map((acc, index) => (
                        <TableRow key={index}
                            onClick={() => handleRowClick(index)}
                            sx={{ backgroundColor: selectedPetIndex === index ? "#f0f0f0" : "inherit" }}
                        >
                            <TableCell>{acc.tenDangNhap}</TableCell>
                            <TableCell>{acc.quyen}</TableCell>
                            <TableCell>{acc.trangThai? "Hoạt đông" : "Ngưng"}</TableCell>
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

export default ManageAccount;





