import {React, useEffect, useMemo, useState} from 'react'
import { Card, CardContent, CardMedia, Typography, Button, Snackbar } from '@mui/material';
import AxiosInstance from './AxiosInstante';
import { PrintTwoTone } from '@mui/icons-material';

const PetCard = ({ pet, hinhAnh }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [image, setImage] = useState()
  useEffect(() => {
    const fetchImages = async (ids) => {
      try {
        const response = await AxiosInstance.post('/center/image/get', ids, {
          responseType: 'arraybuffer', // Ensure the response is treated as binary data
        });

        // Convert the binary data to a base64 string
        const images = response.data.map(image => {
          const base64String = btoa(
            new Uint8Array(image).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          return `data:image/jpeg;base64,${base64String}`;
        });

        return images;
      } catch (error) {
        console.error('Error fetching images:', error);
        return [];
      }
    };

    if (hinhAnh && hinhAnh.length > 0) {
      const loadImages = async () => {
        const fetchedImages = await fetchImages([hinhAnh[0]]);
        setImage(fetchedImages[0]);
      };

      loadImages();
    }
  }, [hinhAnh]);
  const handleBuyClick = () => {
    setOpenSnackbar(true);
    // You can add more functionality here, such as adding the pet to a cart
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <>
      <Card sx={{ maxWidth: 345, margin: '16px', textAlign: 'center'}}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={pet.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pet.tenThuCung}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pet.moTa}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pet.giaHienTai}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pet.giaKhuyenMai}
          </Typography>
        </CardContent>
        <Button variant="contained" onClick={handleBuyClick}>Thêm vào giỏ hàng</Button>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={`You bought ${pet.name}!`}
      />
    </>
  );
};

export default PetCard;
