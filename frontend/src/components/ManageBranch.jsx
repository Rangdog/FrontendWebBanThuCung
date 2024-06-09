import React,{ useState, useEffect, useRef} from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper } from '@mui/material';
import AxiosInstance from './AxiosInstante';
import { useSnackbar } from 'notistack';

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
            label="Tên chi nhánh"
            fullWidth
            {...register("tenChiNhanh", { required: true })}
            error={!!errors.ho}
            helperText={errors.ho ? "Tên chi nhánh là bắt buộc" : ""}
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

const EditBrandForm = ({ open, onClose, onSubmit, chiNhanh }) => {
    if(!chiNhanh){
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
              label="Tên chi nhánh"
              value={chiNhanh.tenChiNhanh}
              fullWidth
              {...register("tenChiNhanh", { required: true })}
              error={!!errors.ho}
              helperText={errors.ho ? "Tên chi nhánh là bắt buộc" : ""}
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
    const [selectedbranchIndex, setSelectedbranchIndex] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const tableRef = useRef(null);
    const [chiNhanh, setChiNhanh] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const getChiNhanh = async ()=>{
      try{
        const res = await AxiosInstance.get("/center/chinhanh")
        setChiNhanh(res.data)
      }
      catch(err){
        console.error(err);
      }
    }
  // Assume pets data is available in pets array
  // const chiNhanh = [
  //   {maChiNhanh: 1, tenChiNhanh: "Man thiện"},
  //   {maChiNhanh: 2, tenChiNhanh: "Trần Thị Hoa"}
  // ]
// Hàm xử lý khi chọn một hàng
    const handleRowClick = (index) => {
        if (selectedbranchIndex == index){
            setSelectedbranchIndex(null);
        }
        else{
            setSelectedbranchIndex(index);
        }
  };

  // Hàm xử lý khi ấn vào nút Edit
  const handleEdit = () => {
    // Thực hiện hành động edit với thông tin của hàng được chọn
    if(selectedbranchIndex !== null) {
      const selectedPet = pets[selectedbranchIndex];
      // Thực hiện hành động edit với selectedPet
      console.log("Edit pet:", selectedPet);
    }
  };

  // Hàm xử lý khi ấn vào nút Delete
  const handleDelete = () => {
    // Thực hiện hành động delete với thông tin của hàng được chọn
    if(selectedbranchIndex !== null) {
      const selectedPet = pets[selectedbranchIndex];
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

  const handleFormSubmit = async(data) => {
    try{
      const res = await AxiosInstance.post("/center/chinhanh", data.tenChiNhanh)
      if(res.status === 200){
        enqueueSnackbar('Thêm chi nhanh thành công', {variant : 'success', autoHideDuration: 3000} )
        getChiNhanh()
      }
    }
    catch(err){
      enqueueSnackbar('Lỗi', {variant : 'error', autoHideDuration: 3000} )
      console.log(err)
    }
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
  useEffect(()=>{
    getChiNhanh();
  },[])
  return (
    <>
        <SearchBar/>
        <ActionButtons onEdit={handleEdit} onDelete={handleDelete} onOpenDialog={handleDialogOpen} onOpenEditForm = {handleEditDialogOpen} isDisabled={selectedbranchIndex === null}/>
        <AddBrandForm open={isDialogOpen} onClose={handleDialogClose} onSubmit={handleFormSubmit} />
        <EditBrandForm open={isEditOpen} onClose={handleEditDialogClose} onSubmit={handleEditFormSubmit} chiNhanh = {chiNhanh[selectedbranchIndex]} />
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
                    {chiNhanh.map((chiNhanh, index) => (
                        <TableRow key={index}
                            onClick={() => handleRowClick(index)}
                            sx={{ backgroundColor: selectedbranchIndex === index ? "#f0f0f0" : "inherit" }}
                        >
                            <TableCell>{chiNhanh.maChiNhanh}</TableCell>
                            <TableCell>{chiNhanh.tenChiNhanh}</TableCell>          
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





