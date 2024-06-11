import React,{ useState, useEffect, useRef} from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper,  Select, MenuItem, FormControl, InputLabel, FormHelperText, Box } from '@mui/material';
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

const AddThuCungForm = ({ open, onClose, onSubmit }) => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedBreed, setSelectedBreed] = useState('');
    const [branches, setBranches] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [formError, setFormError] = useState(false);
    const [selectedSaleStatus, setSelectedSaleStatus] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
     const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
     const handleFormSubmit = (data) => {
        if (!selectedBranch || !selectedBreed || selectedSaleStatus === '') {
          if (!selectedBranch) {
            setError('chiNhanh', { type: 'required', message: 'Trường này là bắt buộc' });
          }
          if (!selectedBreed) {
            setError('giong', { type: 'required', message: 'Trường này là bắt buộc' });
          }
          if (selectedSaleStatus === '') {
            setError('trangThaiBan', { type: 'required', message: 'Trường này là bắt buộc' });
          }
          setFormError(true);
          return;
        }
        // handle image upload if necessary
        const formData = new FormData();
        if (selectedImage) {
          formData.append('image', selectedImage);
        }
        onSubmit({ ...data, chiNhanh: selectedBranch, giong: selectedBreed, trangThaiBan: selectedSaleStatus, hinhAnh: formData });
      };
      const getBranches = async () => {
        try {
          const res = await AxiosInstance.get("center/chinhanh");
          setBranches(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      const getBreeds = async () => {
        try {
          const res = await AxiosInstance.get("center/giong");
          setBreeds(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      useEffect(() => {
        getBranches();
        getBreeds();
      }, []);
      const handleBranchSelect = (event) => {
        const selectedBranch = branches.find(i => i.maChiNhanh === event.target.value);
        setSelectedBranch(selectedBranch);
      };
    
      const handleBreedSelect = (event) => {
        const selectedBreed = breeds.find(i => i.maGiong === event.target.value);
        setSelectedBreed(selectedBreed);
      };
      const handleSaleStatusSelect = (event) => {
        setSelectedSaleStatus(event.target.value);
      };
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        setImagePreviewUrl(URL.createObjectURL(file));
      };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Thêm hoặc Chỉnh sửa Thú Cưng</DialogTitle>
      <DialogContent>
      <Box display="flex" alignItems="flex-start">
        <Box flex={1} pr={2}>
            <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <TextField
                margin="dense"
                label="Tên Thú Cưng"
                fullWidth
                {...register("tenThuCung", { required: true })}
                error={!!errors.tenThuCung}
                helperText={errors.tenThuCung ? "Tên thú cưng là bắt buộc" : ""}
            />
            <TextField
                margin="dense"
                label="Chủ"
                fullWidth
                {...register("chu", { required: true })}
                error={!!errors.chu}
                helperText={errors.chu ? "Chủ thú cưng là bắt buộc" : ""}
            />
            <FormControl fullWidth error={!!errors.chiNhanh} margin="dense">
                <InputLabel id="branch-select-label">Chi Nhánh</InputLabel>
                <Select
                labelId="branch-select-label"
                value={selectedBranch ? selectedBranch.maChiNhanh : ''}
                onChange={handleBranchSelect}
                required
                >
                {branches.map((i) => (
                    <MenuItem key={i.maChiNhanh} value={i.maChiNhanh}>
                    {i.tenChiNhanh}
                    </MenuItem>
                ))}
                </Select>
                {errors.chiNhanh && <FormHelperText>Trường này là bắt buộc</FormHelperText>}
            </FormControl>
            <FormControl fullWidth error={!!errors.giong} margin="dense">
                <InputLabel id="breed-select-label">Giống</InputLabel>
                <Select
                labelId="breed-select-label"
                value={selectedBreed ? selectedBreed.maGiong : ''}
                onChange={handleBreedSelect}
                required
                >
                {breeds.map((i) => (
                    <MenuItem key={i.maGiong} value={i.maGiong}>
                    {i.tengiong}
                    </MenuItem>
                ))}
                </Select>
                {errors.giong && <FormHelperText>Trường này là bắt buộc</FormHelperText>}
            </FormControl>
            <FormControl fullWidth error={!!errors.trangThaiBan} margin="dense">
                <InputLabel id="sale-status-select-label">Trạng Thái Bán</InputLabel>
                <Select
                labelId="sale-status-select-label"
                value={selectedSaleStatus}
                onChange={handleSaleStatusSelect}
                required
                >
                <MenuItem value={0}>Chưa bán</MenuItem>
                <MenuItem value={1}>Đã bán</MenuItem>
                </Select>
                {errors.trangThaiBan && <FormHelperText>Trường này là bắt buộc</FormHelperText>}
            </FormControl>
            <TextField
                margin="dense"
                label="Mô Tả"
                fullWidth
                {...register("moTa")}
                multiline
                rows={4}
            />
            <TextField
                margin="dense"
                label="Giá Hiện Tại"
                fullWidth
                {...register("giaHienTai", { required: true, valueAsNumber: true })}
                error={!!errors.giaHienTai}
                helperText={errors.giaHienTai ? "Giá hiện tại là bắt buộc" : ""}
                type="number"
            />
            <FormControl fullWidth margin="dense">
                <input
                accept="image/*"
                id="image-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                <Button variant="contained" component="span">
                    Chọn Hình Ảnh
                </Button>
                </label>
                </FormControl>
            </form>
        </Box>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" pl={2}>
                {imagePreviewUrl && (
                <img src={imagePreviewUrl} alt="Preview" style={{ maxHeight: '200px', maxWidth: '100%' }} />
                )}
            </Box>
      </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit(handleFormSubmit)} variant="contained">Thêm</Button>
      </DialogActions>
    </Dialog>
  );
};

// const EditBreedForm = ({ open, onClose, onSubmit, breed }) => {
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm();
//   const [selectedPet, setSelectedPet] = useState(null);
//   const [pet, setPet] = useState([])
//   const [error, setError] = useState(false);
//   const handleFormSubmit = (data) => {
//     if (!selectedPet) {
//       setError('loaiThuCung', { type: 'required', message: 'Trường này là bắt buộc' });
//       return;
//     }
//     onSubmit( {...data, loaiThuCung:selectedPet});
//   };
//   const getPet = async()=>{
//     try{
//       const res = await  AxiosInstance.get("center/loaithucung")
//       setPet(res.data)
//   }
//   catch(err){
//     console.error(err)
//   }
//   }
//   useEffect(()=>{
//     if(!breed){
//       return;
//     }
//     setValue('maGiong',breed.maGiong)
//     setValue('tengiong', breed.tengiong)
//     setSelectedPet(breed.loaiThuCung)
//     getPet()
//   },[breed])
//   const handlePetSelect = (event) => {
//     const selectedPet = pet.find(i => i.maLoaiThuCung === event.target.value);
//     setSelectedPet(selectedPet);
//   };
//   if(!breed){
//     return;
//   }
//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Sửa Giống</DialogTitle>
//       <DialogContent>
//       <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
//         <TextField
//             margin="dense"
//             label="ID"
//             fullWidth
//             readOnly
//             value={breed.maGiong}
//             {...register("maGiong", { required: true })}
//             error={!!errors.tenLoaiThuCung}
//             helperText={errors.tenLoaiThuCung ? "Tên loài thú cưng là bắt buộc" : ""}
//           />
//           <TextField
//             margin="dense"
//             label="Tên giống mới"
//             fullWidth
//             defaultValue={breed.tengiong}
//             {...register("tengiong", { required: true })}
//             error={!!errors.tengiong}
//             helperText={errors.tengiong ? "Tên giống là bắt buộc" : ""}
//           />
//           <FormControl fullWidth error={error}>
//             <InputLabel id="pet-select-label">Loại thú cưng</InputLabel>
//                   <Select
//                     labelId="pet-select-label"
//                     value={selectedPet ? selectedPet.maLoaiThuCung : ''}
//                     onChange={handlePetSelect}
//                     required
//                   >
//                     {pet.map((i) => (
//                       <MenuItem key={i.maLoaiThuCung} value={i.maLoaiThuCung}>
//                         {i.tenLoaiThuCung}
//                       </MenuItem>
//                     ))}
//                   </Select>
//               {error && <FormHelperText>Trường này là bắt buộc</FormHelperText>}
//           </FormControl>
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Hủy</Button>
//         <Button onClick={handleSubmit(handleFormSubmit)} variant="contained">Sửa</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa</DialogTitle>
      <DialogContent>
        Bạn có chắc chắn muốn xóa giống này không?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={onConfirm} variant="contained" color="error">Yes</Button>
      </DialogActions>
    </Dialog>
  );
};


const ManageAccount = () => {
    const [selectedBreedIndex, setSelectedBreedIndex] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const tableRef = useRef(null);
    const [pets, setPets] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const getBreed = async ()=>{
      try{
        const res = await AxiosInstance.get("/center/thucung")
        setPets(res.data)
      }
      catch(err){
        console.error(err);
      }
    }
    const handleConfirmDelete = async (breed) => {
      try {
          const res = await AxiosInstance.delete(`/center/giong/${breed.maGiong}`);
          if (res.status === 200) {
              enqueueSnackbar('Xóa giống thành công', { variant: 'success', autoHideDuration: 3000 });
              getBreed();
          }
      } catch (err) {
          enqueueSnackbar('Lỗi khi xóa thú cưng', { variant: 'error', autoHideDuration: 3000 });
          console.error(err);
      }
      setIsConfirmOpen(false);
      setSelectedBreedIndex(null);
    };
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
      setIsConfirmOpen(true)
    
  };
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = async(data) => {
    console.log(data)
    // try{
    //   const res = await AxiosInstance.post("/center/giong", data,{ 
    //   })
    //   if(res.status === 200){
    //     enqueueSnackbar('Thêm giống thành công', {variant : 'success', autoHideDuration: 3000} )
    //     getBreed()
    //   }
    // }
    // catch(err){
    //   enqueueSnackbar('Lỗi', {variant : 'error', autoHideDuration: 3000} )
    //   console.log(err)
    // }
    handleDialogClose();
  };
  const handleEditDialogOpen = () => {
    setIsEditOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditOpen(false);
  };

  const handleEditFormSubmit = async(data) => {
    console.log("Form Data:", data);
    try{
      const res = await AxiosInstance.put("/center/giong", data)
      if(res.status === 200){
        enqueueSnackbar(' sửa giống thành công', {variant : 'success', autoHideDuration: 3000} )
        getBreed()
      }
    }
    catch(err){
      enqueueSnackbar('lỗi', {variant : 'error', autoHideDuration: 3000} )
    }
    handleEditDialogClose();
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
    getBreed();
  },[])
  return (
    <>
        <SearchBar/>
        <ActionButtons onEdit={handleEdit} onDelete={handleDelete} onOpenDialog={handleDialogOpen} onOpenEditForm = {handleEditDialogOpen} isDisabled={selectedBreedIndex === null}/>
        <AddThuCungForm open={isDialogOpen} onClose={handleDialogClose} onSubmit={handleFormSubmit} />
        {/* <EditBreedForm open={isEditOpen} onClose={handleEditDialogClose} onSubmit={handleEditFormSubmit} pet = {pets[selectedBreedIndex]} /> */}
        <ConfirmationDialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={()=>handleConfirmDelete(pets[selectedBreedIndex])} />
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }} ref={tableRef}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>Mã thú cưng</TableCell>
                        <TableCell>Hình ảnh</TableCell>
                        <TableCell>Tên thú cưng</TableCell>
                        <TableCell>Trạng thái bán</TableCell>
                        <TableCell>Chủ</TableCell>
                        <TableCell>Mô tả</TableCell>
                        <TableCell>Giá</TableCell>
                        <TableCell>Giá khuyến mãi</TableCell>
                        <TableCell>Chi nhánh</TableCell>
                        <TableCell>Giống</TableCell>
                        <TableCell>Số lượng tồn</TableCell>        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pets.map((pet, index) => (
                        <TableRow key={index}
                            onClick={() => handleRowClick(index)}
                            sx={{ backgroundColor: selectedBreedIndex === index ? "#f0f0f0" : "inherit" }}
                        >
                            <TableCell>{pet.maThuCung}</TableCell>
                            <TableCell>Hình ảnh</TableCell>
                            <TableCell>{pet.tenThuCung}</TableCell>
                            <TableCell>{pet.trangThaiBan}</TableCell>
                            <TableCell>{pet.chu}</TableCell>
                            <TableCell>{pet.moTa}</TableCell>
                            <TableCell>{pet.giaHienTai}</TableCell>
                            <TableCell>{pet.giaKM}</TableCell>
                            <TableCell>{pet.chiNhanh.tenChiNhanh}</TableCell>
                            <TableCell>{pet.giong.tengiong}</TableCell>
                            <TableCell>{pet.soLuongTon}</TableCell>           
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





