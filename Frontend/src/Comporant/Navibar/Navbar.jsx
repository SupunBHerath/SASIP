import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

import { Color, Font } from '../CSS/Css';
import SocialMediaSidebar from '../Social/SocialMediaSidebar';
import Head from '../Landing/common/header/Head';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import logo from '../../../public/Logo/logohe.png'

const Logo = styled('img')({
    height: '65px',
    marginRight: '16px',
});

const NavLink = styled(Button)(({ theme, active }) => ({
    color: active ? theme.palette.primary.main : Color.PrimaryColor,
    textTransform: 'none',
    margin: '0 8px',
    fontWeight: 'bold',
    fontSize: '16px',
    fontFamily: Font.PrimaryFont,
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
}));

export default function Navbar({ position, fixed }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {!position && !isMobile && <Head />}
            <AppBar
                position={position ? "static" : isScrolled ? "fixed" : "static" && fixed ? 'fixed' : 'auto'}
                style={{
                    backgroundColor: isScrolled ? 'rgba(255, 255, 255)' : 'rgba(255, 255, 255, 0.604)',
                    color: Color.PrimaryColor,
                    fontFamily: Font.PrimaryFont,
                    fontWeight: '1000px',
                    width: position || fixed ? '100%' : isMobile ? "100%" : isScrolled ? '100%' : '96%',
                    margin: isScrolled ? '0 auto' : 'auto',
                    boxShadow: isScrolled ? '0px 4px 6px rgba(0, 0, 0, 0.6)' : '-10px 10px 0 rgba(0, 0, 0, 0.5)',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1300,
                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease, width 0.3s ease, margin 0.3s ease'
                }}
            >
                {position || fixed && !isScrolled ? (<SocialMediaSidebar />) : ''}
                {!position && isScrolled ? (<SocialMediaSidebar />) : ''}
                <Toolbar disableGutters>
                    <Logo src="../../../public/Logo/logohe.png" alt="Sasip" />
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 900, marginLeft: 10 }}>
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                style={{ marginRight: '15px' }}
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMenuOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={() => { handleMenuClose(); navigate('/'); }} >Home</MenuItem>
                                <MenuItem onClick={() => { handleMenuClose(); navigate('/about'); }}>About</MenuItem>
                                <MenuItem onClick={() => { handleMenuClose(); navigate('/lecturers'); }}>Lecturers</MenuItem>
                                <MenuItem onClick={() => { handleMenuClose(); navigate('/timetable/all/all'); }}>Time Table</MenuItem>
                                <MenuItem onClick={() => { handleMenuClose(); navigate('/contact'); }}>Contact Us</MenuItem>
                                <MenuItem onClick={() => { handleMenuClose(); navigate('https://youtube.com/'); }}>
                                    <Box sx={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        alignItems: 'center',
                                        backgroundColor: "#b21e1e",
                                        padding: '5px 10px',
                                    }}>
                                        <Button
                                            style={{
                                                color: 'white',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            SASIP INSTITUTE
                                        </Button>
                                    </Box>
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <NavLink onClick={() => navigate('/')} active={isActive('/')} style={{fontFamily:Font.PrimaryFont , fontWeight:900,fontSize:18 ,color:'#473087'}}>Home</NavLink>
                            <NavLink onClick={() => navigate('/about')} active={isActive('/about')}style={{fontFamily:Font.PrimaryFont , fontWeight:900,fontSize:18,color:'#473087'}}>About</NavLink>
                            <NavLink onClick={() => navigate('/lecturers')} active={isActive('/lecturers')}style={{fontFamily:Font.PrimaryFont , fontWeight:900,fontSize:18,color:'#473087'}}>Lecturers</NavLink>
                            <NavLink onClick={() => navigate('/timetable/all/all')} active={isActive('/timetable/all/all')}style={{fontFamily:Font.PrimaryFont , fontWeight:900,fontSize:18,color:'#473087'}}>Time Table</NavLink>
                            <NavLink onClick={() => navigate('/contact')} active={isActive('/contact')}style={{fontFamily:Font.PrimaryFont , fontWeight:900,fontSize:18,color:'#473087'}}>Contact Us</NavLink>
                            <Box sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: "#b21e1e",
                                height: 65,
                                clipPath: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
                                padding: '30px 60px',
                                marginLeft: 'auto'
                            }}>
                                <Button
                                    onClick={() => { handleMenuClose(); window.open('https://www.sasipinstitute.com/', '_blank'); }}
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    SASIP INSTITUTE
                                </Button>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <ScrollToTopButton />
        </>
    );
}
