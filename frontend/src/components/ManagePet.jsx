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
      <DialogTitle>Thêm loài thứ cưng mới</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <TextField
            margin="dense"
            label="Tên loại thú cưng"
            fullWidth
            {...register("tenLoaiThuCung", { required: true })}
            error={!!errors.ho}
            helperText={errors.ho ? "Tên loại thú cưng là bắt buộc" : ""}
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

const EditPetForm = ({ open, onClose, onSubmit, pet }) => {
    if(!pet){
        return null;
    }
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const handleFormSubmit = (data) => {
      onSubmit(data);
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Sửa loài thú cưng</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <TextField
              margin="dense"
              label="Tên loại thú cưng"
              value={pet.tenLoaiThuCung}
              fullWidth
              {...register("tenLoaiThuCung", { required: true })}
              error={!!errors.ho}
              helperText={errors.ho ? "Tên loại thú cưng là bắt buộc" : ""}
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
    const [selectedPetIndex, setSelectedPetIndex] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const tableRef = useRef(null);
  // Assume pets data is available in pets array
  const pet = [
    {maLoaiThuCung: 2, tenLoaiThuCung: "Mèo"},
    {maLoaiThuCung: 3, tenLoaiThuCung: "Chó"},
    {maLoaiThuCung: 4, tenLoaiThuCung: "Bò sát"},
    {maLoaiThuCung: 5, tenLoaiThuCung: "Chuột"},
    {maLoaiThuCung: 7, tenLoaiThuCung: "Cá"},
  ]
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
        <ActionButtons onEdit={handleEdit} onDelete={handleDelete} onOpenDialog={handleDialogOpen} onOpenEditForm = {handleEditDialogOpen} isDisabled={selectedPetIndex === null}/>
        <AddBrandForm open={isDialogOpen} onClose={handleDialogClose} onSubmit={handleFormSubmit} />
        <EditPetForm open={isEditOpen} onClose={handleEditDialogClose} onSubmit={handleEditFormSubmit} pet = {pet[selectedPetIndex]} />
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }} ref={tableRef}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>Mã loài thú cưng</TableCell>
                        <TableCell>Tên loài thú cưng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pet.map((pet, index) => (
                        <TableRow key={index}
                            onClick={() => handleRowClick(index)}
                            sx={{ backgroundColor: selectedPetIndex === index ? "#f0f0f0" : "inherit" }}
                        >
                            <TableCell>{pet.maLoaiThuCung}</TableCell>
                            <TableCell>{pet.tenLoaiThuCung}</TableCell>          
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




