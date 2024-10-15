import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../rtk/slices/userSlice';
import { useDispatch } from 'react-redux';
import { memo, useState } from 'react';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {Button} from '@mui/material';

// Navigation


const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/login');
        localStorage.removeItem('userLoggedIn');
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#3B3030', borderRadius: '8px' }}>
            <Container maxWidth="xl" sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography>
                    <Link to={'/'} className='link'>
                    <MenuBookRoundedIcon sx={{ color: 'white', fontSize: 30 }} />
                    </Link>
                </Typography>
                <Toolbar disableGutters
                className='toolbar'>
                    <Stack direction={'row'} justifyContent={'space-between'} gap={1} sx={{
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        width: "50%",
                        height: "100%",
                        color: 'white',
                    }}>
                        {userLoggedIn && (
                            <>
                                {/* Show links directly for larger screens */}
                                {!isSmallScreen && (
                                    <>
                                        <Typography>
                                            <Link to={'/'} className='link'>Home</Link>
                                        </Typography>
                                        <Typography>
                                            <Link to={'/create'} className='link'>Create</Link>
                                        </Typography>
                                        <Typography 
                                        className='link'>
                                        <Button onClick={() => {
                                            handleLogout();
                                            handleClose();
                                        }} 
                                        sx={{
                                        color: 'white',
                                        backgroundColor: '#795757',
                                        borderRadius: '4px',
                                        padding: '2px 10px',
                                        textTransform: 'uppercase',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: '#292020',
                                        },
                                        }}
                                        className='link'>Logout</Button>
                                        </Typography>
                                    </>
                                )}
                                {/* Menu button for small and medium screens */}
                                {isSmallScreen && (
                                    <>
                                        <IconButton onClick={handleMenuClick} sx={{ color: 'white' }}>
                                            <MenuIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            className='menu'
                                        >
                                            <MenuItem onClick={handleClose}
                                            className='mi'>
                                                <Link to={'/'} className='link'>Home</Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}
                                            className='mi'>
                                                <Link to={'/create'} className='link'>Create</Link>
                                            </MenuItem>
                                            <MenuItem onClick={() => {
                                                handleLogout();
                                                handleClose();
                                            }}
                                            className='mi'>
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </>
                                )}
                            </>
                        )}
                        {!userLoggedIn && (
                            <>
                                {/* Show links directly for larger screens */}
                                {!isSmallScreen && (
                                    <>
                                        <Typography>
                                            <Link to={'/login'} className='link'>Login</Link>
                                        </Typography>
                                        <Typography>
                                            <Link to={"/signIn"} className='link'>SignUp</Link>
                                        </Typography>
                                        <Typography 
                                        className='link'>
                                        <Button onClick={() => {
                                            handleLogout();
                                            handleClose();
                                        }} 
                                        sx={{
                                        color: 'white',
                                        backgroundColor: '#795757',
                                        borderRadius: '4px',
                                        padding: '2px 10px',
                                        textTransform: 'uppercase',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: '#292020',
                                        },
                                        }}
                                        className='link'>Logout</Button>
                                        </Typography>
                                    </>
                                )}
                                {/* Menu button for small and medium screens */}
                                {isSmallScreen && (
                                    <>
                                        <IconButton onClick={handleMenuClick} sx={{ color: 'white' }}>
                                            <MenuIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            className='menu'
                                        >
                                            <MenuItem onClick={handleClose}
                                            className='mi'>
                                                <Link to={'/login'} className='link'>Login</Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}
                                            className='mi'>
                                                <Link to={"/signIn"} className='link'>SignUp</Link>
                                            </MenuItem>
                                        </Menu>
                                    </>
                                )}
                            </>
                        )}
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default memo(NavBar);