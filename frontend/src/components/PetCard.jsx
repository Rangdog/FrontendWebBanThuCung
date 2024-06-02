import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Snackbar } from '@mui/material';

const PetCard = ({ pet }) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleBuyClick = () => {
    setOpenSnackbar(true);
    // You can add more functionality here, such as adding the pet to a cart
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, margin: '16px', textAlign: 'center' }}>
        <CardMedia
          component="img"
          height="140"
          image={pet.image}
          alt={pet.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pet.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pet.description}
          </Typography>
        </CardContent>
        <Button variant="contained" onClick={handleBuyClick}>Buy</Button>
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
