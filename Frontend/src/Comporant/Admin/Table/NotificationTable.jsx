import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog,
    DialogActions, DialogContent, DialogTitle, TextField, IconButton, FormControl, Select, MenuItem, InputLabel
} from '@mui/material';
import { Delete, Send } from '@mui/icons-material';

const NotificationTable = () => {
    const [openSendDialog, setOpenSendDialog] = useState(false);
    const [openStatusDialog, setOpenStatusDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedMessage, setSelectedMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [data, setData] = useState([
        { no: 1, name: 'John Doe', email: 'john@example.com', message: 'Hello', status: 'unread', date: '2023-01-01' },
        { no: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Hi there', status: 'read', date: '2023-02-01' },
        // Add more sample data as needed
    ]);

    const handleClickOpenSendDialog = (row) => {
        setSelectedEmail(row.email);
        setOpenSendDialog(true);
    };

    const handleOpenStatusDialog = (row) => {
        setSelectedRow(row);
        setSelectedStatus(row.status);
        setOpenStatusDialog(true);
    };

    const handleOpenDeleteDialog = (row) => {
        setSelectedRow(row);
        setOpenDeleteDialog(true);
    };

    const handleClose = () => {
        setOpenSendDialog(false);
        setOpenStatusDialog(false);
        setOpenDeleteDialog(false);
        setSelectedEmail('');
        setSelectedMessage('');
        setSelectedFile(null);
        setSelectedRow(null);
        setSelectedStatus('');
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSend = () => {
        // Handle sending email logic here
        console.log('Email:', selectedEmail);
        console.log('Message:', selectedMessage);
        console.log('File:', selectedFile);
        handleClose();
    };

    const handleChangeStatus = () => {
        const updatedData = data.map(item =>
            item.no === selectedRow.no ? { ...item, status: selectedStatus } : item
        );
        setData(updatedData);
        handleClose();
    };

    const handleDelete = () => {
        setData(data.filter(item => item.no !== selectedRow.no));
        handleClose();
    };

    const filteredData = filterStatus ? data.filter(item => item.status === filterStatus) : data;

    return (
        <TableContainer component={Paper} className='shadow-sm border border-danger-subtle'>
            <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
                <InputLabel>Status Filter</InputLabel>
                <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="unread">Unread</MenuItem>
                    <MenuItem value="read">Read</MenuItem>
                </Select>
            </FormControl>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map((row) => (
                        <TableRow key={row.no}>
                            <TableCell>{row.no}</TableCell>
                            <TableCell>{row.date}</TableCell> 
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.message}</TableCell>
                            <TableCell
                                sx={{
                                    color: row.status === 'unread' ? 'red' : 'green',
                                    fontWeight: 'bold',
                                }}
                            >
                                {row.status}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleOpenStatusDialog(row)}
                                    sx={{ ml: 1 }}
                                >
                                    Change Status
                                </Button>
                                <IconButton onClick={() => handleOpenDeleteDialog(row)}>
                                    <Delete />
                                </IconButton>
                                <IconButton onClick={() => handleClickOpenSendDialog(row)}>
                                    <Send />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openSendDialog} onClose={handleClose}>
                <DialogTitle>Send Email</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={selectedEmail}
                        onChange={(e) => setSelectedEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Message"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={selectedMessage}
                        onChange={(e) => setSelectedMessage(e.target.value)}
                    />
                    <input
                        accept="image/*,.pdf"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" component="span" sx={{ mt: 2 }}>
                            Upload File
                        </Button>
                        {selectedFile && <span> {selectedFile.name}</span>}
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSend}>Send</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openStatusDialog} onClose={handleClose}>
                <DialogTitle>Change Status</DialogTitle>
                <DialogContent>
                    <FormControl variant="standard" fullWidth>
                        <Select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            sx={{
                                color: selectedStatus === 'unread' ? 'red' : 'green',
                                fontWeight: 'bold',
                                '& .MuiSelect-select': {
                                    display: 'flex',
                                    alignItems: 'center',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: selectedStatus === 'unread' ? 'red' : 'green',
                                },
                            }}
                        >
                            <MenuItem value="unread" sx={{ color: 'red', fontWeight: 'bold' }}>Unread</MenuItem>
                            <MenuItem value="read" sx={{ color: 'green', fontWeight: 'bold' }}>Read</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleChangeStatus}>Change</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteDialog} onClose={handleClose}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this item?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
};

export default NotificationTable;
