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

const EditPetForm = ({ open, onClose, onSubmit, breed }) => {
    if(!breed){
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
              label="Tên loại thú cưng"
              value={breed.tenLoaiThuCung}
              fullWidth
              {...register("tenLoaiThuCung", { required: true })}
              error={!!errors.ho}
              helperText={errors.ho ? "Tên loại thú cưng là bắt buộc" : ""}
            />
            <TextField
              margin="dense"
              label="Tên loại thú cưng"
              value={breed.tenLoaiThuCung}
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
    const [selectedBreedIndex, setSelectedBreedIndex] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const tableRef = useRef(null);
  // Assume pets data is available in pets array
  const breeds = [
    { maGiong: 1, tengiong: "Husky", loaiThuCung: { maLoaiThuCung: 3, tenLoaiThuCung: "Chó" } },
    { maGiong: 2, tengiong: "Chihuahua", loaiThuCung: { maLoaiThuCung: 3, tenLoaiThuCung: "Chó" } },
    { maGiong: 3, tengiong: "Poodle", loaiThuCung: { maLoaiThuCung: 3, tenLoaiThuCung: "Chó" } },
    { maGiong: 4, tengiong: "Alaska", loaiThuCung: { maLoaiThuCung: 3, tenLoaiThuCung: "Chó" } },
    { maGiong: 5, tengiong: "Pitbull", loaiThuCung: { maLoaiThuCung: 3, tenLoaiThuCung: "Chó" } },
    { maGiong: 6, tengiong: "Xiêm", loaiThuCung: { maLoaiThuCung: 2, tenLoaiThuCung: "Mèo" } },
    { maGiong: 7, tengiong: "Ba tư", loaiThuCung: { maLoaiThuCung: 2, tenLoaiThuCung: "Mèo" } },
    { maGiong: 8, tengiong: "Anh lông ngắn", loaiThuCung: { maLoaiThuCung: 2, tenLoaiThuCung: "Mèo" } },
    { maGiong: 9, tengiong: "Anh lông dài", loaiThuCung: { maLoaiThuCung: 2, tenLoaiThuCung: "Mèo" } },
    { maGiong: 10, tengiong: "Rồng nam mỹ", loaiThuCung: { maLoaiThuCung: 4, tenLoaiThuCung: "Bò sát" } },
    { maGiong: 11, tengiong: "Rồng úc", loaiThuCung: { maLoaiThuCung: 4, tenLoaiThuCung: "Bò sát" } },
    { maGiong: 12, tengiong: "Thằn lằn lưỡi xanh", loaiThuCung: { maLoaiThuCung: 4, tenLoaiThuCung: "Bò sát" } },
    { maGiong: 13, tengiong: "Tắc kè", loaiThuCung: { maLoaiThuCung: 4, tenLoaiThuCung: "Bò sát" } },
    { maGiong: 14, tengiong: "Hamster", loaiThuCung: { maLoaiThuCung: 5, tenLoaiThuCung: "Chuột" } },
    { maGiong: 15, tengiong: "Winter white", loaiThuCung: { maLoaiThuCung: 5, tenLoaiThuCung: "Chuột" } },
    { maGiong: 16, tengiong: "Hamster bear", loaiThuCung: { maLoaiThuCung: 5, tenLoaiThuCung: "Chuột" } },
    { maGiong: 17, tengiong: "Koi", loaiThuCung: { maLoaiThuCung: 7, tenLoaiThuCung: "Cá" } },
    { maGiong: 18, tengiong: "Cá vàng", loaiThuCung: { maLoaiThuCung: 7, tenLoaiThuCung: "Cá" } },
    { maGiong: 19, tengiong: "Cá rồng", loaiThuCung: { maLoaiThuCung: 7, tenLoaiThuCung: "Cá" } },
    { maGiong: 20, tengiong: "Cá lau kiếng", loaiThuCung: { maLoaiThuCung: 7, tenLoaiThuCung: "Cá" } }
  ];
// Hàm xử lý khi chọn một hàng
    const handleRowClick = (index) => {
        if (selectedBreedIndex == index){
            setSelectedBreedIndex(null);
        }
        else{
            setSelectedBreedIndex(index);
        }
  };

  // Hàm xử lý khi ấn vào nút Edit
  const handleEdit = () => {
    // Thực hiện hành động edit với thông tin của hàng được chọn
    if(selectedBreedIndex !== null) {
      const selectedPet = pets[selectedBreedIndex];
      // Thực hiện hành động edit với selectedPet
      console.log("Edit pet:", selectedPet);
    }
  };

  // Hàm xử lý khi ấn vào nút Delete
  const handleDelete = () => {
    // Thực hiện hành động delete với thông tin của hàng được chọn
    if(selectedBreedIndex !== null) {
      const selectedPet = pets[selectedBreedIndex];
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
        <ActionButtons onEdit={handleEdit} onDelete={handleDelete} onOpenDialog={handleDialogOpen} onOpenEditForm = {handleEditDialogOpen} isDisabled={selectedBreedIndex === null}/>
        <AddBrandForm open={isDialogOpen} onClose={handleDialogClose} onSubmit={handleFormSubmit} />
        <EditPetForm open={isEditOpen} onClose={handleEditDialogClose} onSubmit={handleEditFormSubmit} breed = {breeds[selectedBreedIndex]} />
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }} ref={tableRef}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>Mã giống</TableCell>
                        <TableCell>Tên giống</TableCell>
                        <TableCell>loai thú cưng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {breeds.map((breed, index) => (
                        <TableRow key={index}
                            onClick={() => handleRowClick(index)}
                            sx={{ backgroundColor: selectedBreedIndex === index ? "#f0f0f0" : "inherit" }}
                        >
                            <TableCell>{breed.maGiong}</TableCell>
                            <TableCell>{breed.tengiong}</TableCell>  
                            <TableCell>{breed.loaiThuCung.tenLoaiThuCung}</TableCell>             
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





