import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid, IconButton } from '@mui/material';
import { Facebook, YouTube, Language } from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';
import Navbar from '../../Comporant/Navibar/Navbar';
import InstituteHistory from './About-Utils/InstituteHistory';

const AboutPage = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    const cardStyles = {
        position: 'relative',
        height: 300,
        overflow: 'hidden',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s',
    };

    const overlayStyles = {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        transform: 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out',
    };

    const descriptionStyles = {
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        color: 'white',
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
    };

    const handleMouseEnter = (e) => {
        const card = e.currentTarget;
        const overlay = card.querySelector('.overlay');
        const description = card.querySelector('.description');
        overlay.style.transform = 'translateY(0)';
        description.style.opacity = 1;
        card.style.transform = 'scale(1.05)';
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        const overlay = card.querySelector('.overlay');
        const description = card.querySelector('.description');
        overlay.style.transform = 'translateY(-100%)';
        description.style.opacity = 0;
        card.style.transform = 'scale(1)';
    };

    return (
        <>
        <Navbar fixed={true}/>
        <Box p={5}>
            <Grid container spacing={4}>
                {/* Header Section */}
                <Grid item xs={12} md={3}>
                    <img src="../../../accests/landing/a.jpg" alt="About Us" style={{ width: 'auto%', height: '450px', borderRadius: '15px', objectFit: 'fill' }} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Typography variant="h3" gutterBottom style={{ fontWeight: 900 }}>Inception of SASIP Institute</Typography>
                    <Typography variant="body1" paragraph>
                        උසස් පෙළ භෞතික විද්‍යාව සඳහා උපකාරක ගුරුවරයෙක් ලෙස මාගේ ගමන් මග ආරම්භ වන්නේ 1997 වසරේදී.
                        කාලයත් සමග මුහුණ දෙන අවස්ථාවන් නිසා හිතේ උපදින දැඩි උවමනාවක් පසුපස අඛණ්ඩ කැපවීමකින් හා ධෛර්යයෙන් යුතුව ලබාගන්නා උත්සාහයේ ප්‍රතිඵලය ලෙස සැසිප් ආයතනය නිර්මාණය වෙනවා. <br /> දරුවන්ගේ අධ්‍යාපනය වෙනුවෙන් උපරිම පහසුකම් හා වඩා හොඳ වටපිටාවක් සහිතව දක්ෂ ගුරුවරුන් පිරිසක් සහභාගී කරගනිමින් ප්‍රශස්ථ සේවාවක් ලබාදීම ප්‍රධාන අරමුණු වනවා.
                        ආයතනය තුල අංක 1 ලෙස සිසුන්ගේ විනය පවත්වා ගැනීමටත් නැවතත් අංක 1 ලෙස වඩා හොඳ අධ්‍යාපනයක් ලබාදීමටත් නිරන්තර සහයෝගයක් ලබාදෙන අප කාර්ය මණ්ඩලය සහ ගුරු මණ්ඩලය වෙත මාගේ හෘදයාංගම ස්තුතිය පලකරනවා.
                        <br /> අප හා එක්ව යන මේ කෙටි ගමන තුල නොදැනුවත් ව හෝ ඔබේ සිත් රිදවීමක් සිදුවුනා නම් අපට සමාවන්න. අපගේ අඩුපාඩු පෙන්වා දෙන්න. ඔබගේ යෝජනාවන් අපට කියන්න.
                        <br />
                        <br />  ස්තූතියි.
                        <br /> මම අමිත් පුස්සැල්ල.
                        <br /> කළමනාකාර අධ්‍යක්ෂ සහ නිර්මාතෘ
                        <br /> සැසිප් අධ්‍යාපන ආයතනය
                    </Typography>
                    <Box mt={2}>
                        <IconButton href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" color="primary">
                            <Facebook />
                        </IconButton>
                        <IconButton href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" color="secondary">
                            <YouTube />
                        </IconButton>
                        <IconButton href="https://www.yourwebsite.com" target="_blank" rel="noopener noreferrer" color="inherit">
                            <Language />
                        </IconButton>
                    </Box>
                </Grid>

                {/* Mission and Vision Section */}
                <Grid item xs={12} sm={6} md={4} data-aos="fade-up">
                    <div className="text-center">
                        {/* <Typography variant="h4" style={{ fontWeight: 800 }}>Our Logo</Typography> */}

                    </div>
                    <br />
                    <Card
                        style={cardStyles}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <CardContent
                            style={{
                                backgroundImage: 'url(../../../accests/About/o.png)',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                height: '100%',
                            }}
                        >
                            <Box
                                className="overlay"
                                style={{
                                    ...overlayStyles,
                                    backgroundImage: 'url(../../../accests/logoback.png)',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                }}
                            ></Box>
                          
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={12} sm={6} md={4} data-aos="fade-up">
                    <div className="text-center">
                        {/* <Typography variant="h4" style={{ fontWeight: 800 }}>Our Mission</Typography> */}

                    </div>
                    <br />
                    <Card
                        style={cardStyles}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <CardContent
                            style={{
                                backgroundImage: 'url(../../../accests/About/m.png)',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                height: '100%',
                            }}
                        >
                            <Box className="overlay"
                                style={{
                                    ...overlayStyles,
                                    backgroundImage: 'url(../../../accests/About/m2.png)',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                }}
                            ></Box>
                          
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} data-aos="fade-up">
                    <div className="text-center">
                        {/* <Typography variant="h4" style={{ fontWeight: 800 }}>Our Vision</Typography> */}

                    </div>
                    <br />
                    <Card
                        style={cardStyles}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <CardContent
                            style={{
                                backgroundImage: 'url(../../../accests/About/v.png)',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                height: '100%',
                            }}
                        >
                            <Box className="overlay"
                                style={{
                                    ...overlayStyles,
                                    backgroundImage: 'url(../../../accests/About/v2.png)',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                }}
                            ></Box>
                           
                        </CardContent>
                    </Card>
                </Grid>
                {/* New History Section */}
                <InstituteHistory />
            </Grid>
        </Box>
        <Footer/>
        </>

    );
};

export default AboutPage;
