import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Facebook, Twitter, YouTube } from '@mui/icons-material';

const SocialMediaSidebar = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 30,
        left:180,
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        
        zIndex: 10000,
        width: 60,
        padding: '13px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#f5f5f8',
        },

        
      }}
    >
      <IconButton href="https://www.facebook.com" target="_blank" sx={{ color: '#3b5998' }}>
        <Facebook />
      </IconButton>
      <IconButton href="https://www.twitter.com" target="_blank" sx={{ color: '#00acee' }}>
        <Twitter />
      </IconButton>
      <IconButton href="https://www.youtube.com" target="_blank" sx={{ color: '#FF0000' }}>
        <YouTube />
      </IconButton>
    </Box>
  );
};

export default SocialMediaSidebar;
