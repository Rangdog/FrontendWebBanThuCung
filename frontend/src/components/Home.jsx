import Footer from "./Footer"
import PetList from "./PetList"
import Filter from "./Filter";
import { Typography, Button, Snackbar } from '@mui/material';
const Home = ()=>{
    return (
        <>
            <Typography gutterBottom variant="h1" component="div" sx ={{textAlign:'center'}}>
                Chào mừng đến với pet shop
            </Typography>
            <Filter/>
            <PetList/>
            <Footer/>
        </>
    )
}
export default Home