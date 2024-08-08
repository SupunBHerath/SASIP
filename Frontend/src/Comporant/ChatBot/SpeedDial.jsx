import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
import logo from '../../../accests/Icon/robo.png';
import icon from '../../../accests/Icon/help2.png';
import { Dialog, DialogContent } from '@mui/material';
import Chatbot from './Chatbot';

export default function BasicSpeedDial() {
    const [open, setOpen] = useState(false); // State to manage dialog visibility

    const handleClick = () => {
        setOpen(true); // Open the dialog when clicking the SpeedDial
    };

    const handleClose = () => {
        setOpen(false); 
    };

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '150px',
                    right: '10px',
                    zIndex: 1000,
                    transform: 'scale(1.1)',
                }}
            >
                <SpeedDial
                    ariaLabel="SpeedDial ChatBot"
                    icon={<Avatar className='p-1' src={logo} />}
                    direction="up"
                    onClick={handleClick} // Open dialog on SpeedDial click
                >
                    {/* No SpeedDialAction components */}
                </SpeedDial>
            </Box>

            <Dialog
                open={open}
                onClose={handleClose} // Close dialog when clicking outside
                fullWidth
                maxWidth="xs"
            >
                <DialogContent style={{ padding: '0', border: "3px solid #f6921e" }}>
                    <Chatbot handleClose={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    );
}
