import Footer from "./Footer"
import PetList from "./PetList"
import { Typography, Button, Snackbar } from '@mui/material';
const Home = ()=>{
    return (
        <>
            <Typography gutterBottom variant="h1" component="div">
                Chào mừng đến với pet shop
            </Typography>
            <PetList/>
            <Footer/>
        </>
    )
}
export default Home