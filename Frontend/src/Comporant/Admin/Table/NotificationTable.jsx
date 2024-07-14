import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog,
    DialogActions, DialogContent, DialogTitle, IconButton, TextField, FormControl, Select, MenuItem, InputLabel
} from '@mui/material';
import { Delete, Send } from '@mui/icons-material';

const NotificationTable = () => {
    const [openSendDialog, setOpenSendDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedMessage, setSelectedMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
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

    const handleOpenDeleteDialog = (row) => {
        setSelectedRow(row);
        setOpenDeleteDialog(true);
    };

    const handleClose = () => {
        setOpenSendDialog(false);
        setOpenDeleteDialog(false);
        setSelectedEmail('');
        setSelectedMessage('');
        setSelectedFile(null);
        setSelectedRow(null);
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

    const handleChangeStatus = (row, status) => {
        const updatedData = data.map(item =>
            item.no === row.no ? { ...item, status: status } : item
        );
        setData(updatedData);
    };

    const handleMarkAllAsRead = () => {
        const updatedData = data.map(item => ({ ...item, status: 'read' }));
        setData(updatedData);
    };

    const handleDelete = () => {
        setData(data.filter(item => item.no !== selectedRow.no));
        handleClose();
    };

    const filteredData = filterStatus ? data.filter(item => item.status === filterStatus) : data;

    return (
        <TableContainer component={Paper} className='shadow-sm border border-danger-subtle'>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
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
                <Button variant="contained" color="primary" onClick={handleMarkAllAsRead} sx={{ m: 2 }}>
                    Mark All as Read
                </Button>
            </div>
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
                                    onClick={() => handleChangeStatus(row, row.status === 'unread' ? 'read' : 'unread')}
                                    sx={{ ml: 1 }}
                                >
                                    {row.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
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
