import React,{ useState, useEffect, useRef} from 'react';
import { TextField, Button, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper,TablePagination  } from '@mui/material';

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


const ManageAccount = () => {
    const [selectedPetIndex, setSelectedPetIndex] = useState(null);
  // Assume pets data is available in pets array
  const account = [
    { tenDangNhap: "lamvu2010", matKhau: "123", quyen: "khachhang", trangThai: true, maXacNhan: null, thoiGianTaoMa: null, thoiGianHetHan: null, thoiGianXacNhan: null },
    { tenDangNhap: "NV1", matKhau: "123", quyen: "admin", trangThai: true, maXacNhan: null, thoiGianTaoMa: null, thoiGianHetHan: null, thoiGianXacNhan: null },
    { tenDangNhap: "NV2", matKhau: "123", quyen: "quanly", trangThai: true, maXacNhan: null, thoiGianTaoMa: null, thoiGianHetHan: null, thoiGianXacNhan: null },
    { tenDangNhap: "NV3", matKhau: "123", quyen: "nhanvien", trangThai: true, maXacNhan: null, thoiGianTaoMa: null, thoiGianHetHan: null, thoiGianXacNhan: null },
    { tenDangNhap: "NV4", matKhau: "123", quyen: "nhanvien", trangThai: true, maXacNhan: null, thoiGianTaoMa: null, thoiGianHetHan: null, thoiGianXacNhan: null }
    // Thêm các đối tượng người dùng khác nếu cần
  ];
  const pets = [
    { name: "Cat", description: "A lovely domestic cat", price: "$50" },
    { name: "Dog", description: "A loyal friend", price: "$100" },
    { name: "Bird", description: "A colorful parrot", price: "$80" },
    { name: "Fish", description: "A beautiful goldfish", price: "$20" },
    // Add more pet objects as needed
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
  const ActionButtons = ({ onEdit, onDelete }) => {
    return (
      <div>
        <Button variant="contained" color="primary" style={{marginRight: '10px'}}>Reset mật khẩu</Button>
        <Button variant="contained" color="primary" style={{marginRight: '10px'}} onClick={onEdit}>Khóa tài khoản</Button>
        <Button variant="contained" color="secondary" onClick={onDelete}>Đăng ký toàn khoản</Button>
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
        <ActionButtons onEdit={handleEdit} onDelete={handleDelete} />
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
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





