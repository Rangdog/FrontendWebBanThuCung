import React,{ useState, useEffect, useRef} from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper } from '@mui/material';


const SearchBar = () => {
  return (
    <div>
      <TextField label="Search" variant="outlined" />
      <Button variant="contained">Search</Button>
    </div>
  );
};

const AddBrandForm = ({ open, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm chi nhánh mới</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <TextField
            margin="dense"
            label="Tên loại sản phẩm"
            fullWidth
            {...register("tenLoaiSanPham", { required: true })}
            error={!!errors.ho}
            helperText={errors.ho ? "Tên loại sản phẩm là bắt buộc" : ""}
          />
          
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit(handleFormSubmit)} variant="contained">Thêm mới</Button>
      </DialogActions>
    </Dialog>
  );
};

const EditBrandForm = ({ open, onClose, onSubmit, loai }) => {
    if(!loai){
        return null;
    }
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const handleFormSubmit = (data) => {
      onSubmit(data);
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Sửa chi nhánh</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <TextField
              margin="dense"
              label="Tên loại sản phẩm"
              value={loai.tenLoaiSanPham}
              fullWidth
              {...register("tenLoaiSanPham", { required: true })}
              error={!!errors.ho}
              helperText={errors.ho ? "Tên loại sản phẩm là bắt buộc" : ""}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button onClick={handleSubmit(handleFormSubmit)} variant="contained">Sửa</Button>
        </DialogActions>
      </Dialog>
    );
  };

const ManageAccount = () => {
    const [selectedTypeIndex, setSelectedTypeIndex] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const tableRef = useRef(null);
  // Assume pets data is available in pets array
  const loai = [
    {maLoaiSanPham: 1, tenLoaiSanPham: "Đồ ăn"},
    {maLoaiSanPham: 2, tenLoaiSanPham: "Thức uống"},
    {maLoaiSanPham: 3, tenLoaiSanPham: "Thuốc"},
    {maLoaiSanPham: 5, tenLoaiSanPham: "Vệ sinh"},
    {maLoaiSanPham: 6, tenLoaiSanPham: "Nhà ở"},
  ]
// Hàm xử lý khi chọn một hàng
    const handleRowClick = (index) => {
        if (selectedTypeIndex == index){
            setSelectedTypeIndex(null);
        }
        else{
            setSelectedTypeIndex(index);
        }
  };

  // Hàm xử lý khi ấn vào nút Edit
  const handleEdit = () => {
    // Thực hiện hành động edit với thông tin của hàng được chọn
    if(selectedTypeIndex !== null) {
      const selectedPet = pets[selectedTypeIndex];
      // Thực hiện hành động edit với selectedPet
      console.log("Edit pet:", selectedPet);
    }
  };

  // Hàm xử lý khi ấn vào nút Delete
  const handleDelete = () => {
    // Thực hiện hành động delete với thông tin của hàng được chọn
    if(selectedTypeIndex !== null) {
      const selectedPet = pets[selectedTypeIndex];
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
  const handleEditDialogOpen = () => {
    setIsEditOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditOpen(false);
  };

  const handleEditFormSubmit = (data) => {
    console.log("Form Data:", data);
    // Handle form submission
    handleDialogClose();
  };
  const ActionButtons = ({ onEdit, onDelete, isDisabled,onOpenDialog,onOpenEditForm  }) => {
    return (
      <div>
        <Button variant="contained" color="primary" style={{marginRight: '10px'}} onClick={onOpenDialog}>Thêm</Button>
        <Button variant="contained" color="primary" style={{marginRight: '10px'}} onClick={onOpenEditForm} disabled={isDisabled}>Sửa</Button>
        <Button variant="contained" color="error" onClick={onDelete} disabled={isDisabled}>Xóa</Button>
      </div>
    );
  };

  return (
    <>
        <SearchBar/>
        <ActionButtons onEdit={handleEdit} onDelete={handleDelete} onOpenDialog={handleDialogOpen} onOpenEditForm = {handleEditDialogOpen} isDisabled={selectedTypeIndex === null}/>
        <AddBrandForm open={isDialogOpen} onClose={handleDialogClose} onSubmit={handleFormSubmit} />
        <EditBrandForm open={isEditOpen} onClose={handleEditDialogClose} onSubmit={handleEditFormSubmit} loai = {loai[selectedTypeIndex]} />
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }} ref={tableRef}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>Mã chi nhánh</TableCell>
                        <TableCell>Tên chi nhánh</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loai.map((loai, index) => (
                        <TableRow key={index}
                            onClick={() => handleRowClick(index)}
                            sx={{ backgroundColor: selectedTypeIndex === index ? "#f0f0f0" : "inherit" }}
                        >
                            <TableCell>{loai.maLoaiSanPham}</TableCell>
                            <TableCell>{loai.tenLoaiSanPham}</TableCell>          
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





