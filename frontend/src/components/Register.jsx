import { Box, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AxiosInstance from './AxiosInstante';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { handleSubmit, control, register } = useForm();
    const navigate = useNavigate();

    const submission = (data) => {
        AxiosInstance.post(`register/`, {
            email: data.email,
            password: data.password,
        }).then(() => {
            navigate(`/`);
        });
    };

    const onlyNumbers = (value) => {
        return /^\d+$/.test(value);
    };

    return (
        <div className={"myBackground"} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <form onSubmit={handleSubmit(submission)} style={{ width: '400px', padding: '20px', borderRadius: '10px' }}>
                <Box className={"whiteBox"} style = {{width: '100%'}}>
                    <Box className={"itemBox"} style = {{width: '100%'}}>
                        <Box className={"title"}>Đăng ký</Box>
                    </Box>
                    <Box className={"itemBox"}>
                        <TextField label={"Tên đăng nhập"} {...register('tenDangNhap')}  fullWidth />
                    </Box>
                    <Box className={"itemBox"}>
                        <TextField label={"Mật khẩu"} type="password" {...register('matKhau')} fullWidth />
                    </Box>
                    <Box className={"itemBox"}>
                        <Box style={{ display: 'flex', gap: '10px' }}>
                            <TextField label={"Họ"} {...register('ho')} fullWidth />
                            <TextField label={"Tên"} {...register('ten')} fullWidth />
                        </Box>
                    </Box>
                    <Box className={"itemBox"}>
                        <TextField label={"CCCD"} {...register('cccd')} fullWidth />
                    </Box>
                    <Box className={"itemBox"}>
                        <TextField
                            label={"SDT"}
                            {...register('soDienThoai', { validate: onlyNumbers })}
                            inputProps={{ inputMode: 'numeric' }}
                            fullWidth 
                        />
                    </Box>
                    <Box className={"itemBox"}>
                        <TextField label={"email"} {...register('email')} fullWidth />
                    </Box>
                    <Box className={"itemBox"}>
                        <Button variant="contained" type={"submit"}>Đăng ký</Button>
                    </Box>
                    <Box className={"itemBox"}>
                        <Link to="/">Có tài khoản, đăng nhập!</Link>
                    </Box>
                </Box>
            </form>
        </div>
    )
}

export default Register;
