import React, { useRef, useState,useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem,
    Select, FormControl, InputLabel, IconButton, Alert, Snackbar
} from '@mui/material';
import { Edit, Delete, FilterList, ChevronLeft, ChevronRight } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const initialData = [
    { id: 1, lid: 'S0001', name: 'Dr. Amith Pussalla', subject: 'Physics', classMode: 'Physical', classType: 'Theory', medium: 'Sinhala', day: 'Monday', time: '10:00 AM - 11:00 PM', note: '', status: 'Visible' },
    // Add more initial data as needed
];

const TimeTableT = () => {
    const [data, setData] = useState(initialData);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [formData, setFormData] = useState({});
    const [filterData, setFilterData] = useState({});
    const [manualInput, setManualInput] = useState(true);
    const [excel, setExcel] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');
    const [currentPage, setCurrentPage] = useState(1);

    const tableRef = useRef(null);
    const rowsPerPage = 5; // 

    ///////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const fetchTimetableData = async () => {
            try {
                const response = await axios.get('/api/timetable/display-timetable'); 
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.error('Failed to fetch timetable data');
                }
            } catch (error) {
                console.error('Error fetching timetable data:', error);
            }
        };

        fetchTimetableData();
    }, []);

    //////////////////////////////////////////////////////////////////////////////////////////

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Calculate pagination range
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    const generatePDF = () => {
        // Hide columns by setting their display to 'none'
        const columnsToHide = tableRef.current.querySelectorAll('.hide-on-pdf');
        columnsToHide.forEach(col => col.style.display = 'none');

        const input = tableRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 208;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('timetable.pdf');

            // Revert column display to original state
            columnsToHide.forEach(col => col.style.display = '');
        });
    };
    const handleOpenEdit = (row) => {
        setFormData(row);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleOpenAdd = () => {
        setFormData({});
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleOpenFilter = () => {
        setFilterData((prevFilterData) => prevFilterData && Object.keys(prevFilterData).length > 0 ? prevFilterData : {});
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFilterChange = (e) => {
        setFilterData({ ...filterData, [e.target.name]: e.target.value });
    };

    const handleResetFilter = () => {
        setFilterData({});
        setData(initialData);
        handleCloseFilter();
    };

    const handleSave = () => {
        const updatedData = data.map(item => item.id === formData.id ? formData : item);
        setData(updatedData);
        handleCloseEdit();
    };
///////////////////////////////////////////////////////////////////////////////////////////////
const handleAdd = async () => {
    const timetableEntries = [
        {
            lid: formData.lid || '',
            name: formData.name || '',
            subject: formData.subject || '',
            classMode: formData.classMode || '',
            classType: formData.classType || '',
            medium: formData.medium || '',
            day: formData.day || '',
            time: formData.time || '',
            note: formData.note || '',
            status: formData.status || ''
        }
    ];

    // Log timetableEntries for debugging
    console.log('Timetable Entries:', timetableEntries);

    try {
        const response = await axios.post('/api/timetable/add', timetableEntries, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            setData((prevData) => [...prevData, ...timetableEntries]); // assuming response.data contains the added entries
            setAlertOpen(true);
            setAlertMessage('Timetable added successfully!');
            setAlertSeverity('success');
            handleCloseAdd();
        } else {
            setAlertOpen(true);
            setAlertMessage('Failed to add timetable');
            setAlertSeverity('error');
        }
    } catch (error) {
        console.error('Error adding timetable:', error);
        setAlertOpen(true);
        setAlertMessage('Error adding timetable');
        setAlertSeverity('error');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////
    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    };

    const handleAddF = () => {
        if (!selectedFile) {
            setAlertSeverity('error');
            setAlertMessage('Please select a file to import.');
            setAlertOpen(true);
            return;
        }
        handleFileChange(selectedFile);  // Pass the selected file to handleFileChange
        handleCloseAdd();
    };

    const handleFileChange = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });

                 // Log the entire worksheet to check the data structure
            console.log('Worksheet data:', worksheet);

                    // Log the first row to check column names
                if (worksheet.length > 0) {
                    console.log('First row of data:', worksheet[0]);
                }

                const parsedData = worksheet.map((row) => {
                    if (row["Lecturer's  ID "] || row["Lecturer's  ID"]) {
                        return {
                            lid: row["Lecturer's  ID "] || row["Lecturer's  ID"],
                            name: row['Lecturer Name'],
                            subject: row['Subject'],
                            classMode: row['Class ( Physical / Online )'],
                            classType: row['Class Type ( Theory / Paper / Revision )'],
                            medium: row['Medium'],
                            day: row['Day'],
                            time: row['Time'],
                            note: row['Note'],
                            status: row['Status'],
                        };
                    }
                    return null;
                }).filter(row => row !== null);

                try {
                    const response = await axios.post('/api/timetable/xl/add', parsedData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
    
                    if (response.status === 200) {
                        setData((prevData) => [...prevData, ...response.data]);
                        setAlertOpen(true);
                        setAlertMessage('Timetable uploaded successfully!');
                        setAlertSeverity('success');
                    } else {
                        setAlertOpen(true);
                        setAlertMessage('Failed to upload timetable');
                        setAlertSeverity('error');
                    }
                } catch (error) {
                    console.error('Error uploading timetable:', error);
                    setAlertOpen(true);
                    setAlertMessage('Error uploading timetable');
                    setAlertSeverity('error');
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };
    const applyFilter = () => {
        const filteredData = initialData.filter(item => {
            return Object.keys(filterData).every(key => {
                if (!filterData[key]) return true;
                return item[key].toString().toLowerCase().includes(filterData[key].toString().toLowerCase());
            });
        });
        setData(filteredData);
        handleCloseFilter();
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={generatePDF}>Generate PDF</Button>
            <Button variant="outlined" className='mx-3' onClick={handleOpenAdd}>Add Timetable</Button>
            <IconButton onClick={handleOpenFilter}>
                <FilterList />
            </IconButton>
            <TableContainer component={Paper} id="table-container " className='mt-3' ref={tableRef} >

                <Table className='border border-solid border-secondary  ' >
                    <TableHead style={{ backgroundColor: 'lightgreen' }} >
                        <TableRow>
                            <TableCell className="text-center " style={{ color: 'back', fontWeight: 'bolder' }} >No</TableCell>
                            <TableCell className="text-center " style={{ color: 'back', fontWeight: 'bolder' }} >Lecture ID</TableCell>
                            <TableCell className="text-center " style={{ color: 'back', fontWeight: 'bolder' }} >Lecturer Name</TableCell>
                            <TableCell className="text-center " style={{ color: 'back', fontWeight: 'bolder' }} >Subject</TableCell>
                            <TableCell className="text-center " style={{ color: 'back', fontWeight: 'bolder' }} >Class</TableCell>
                            <TableCell className="text-center " style={{ color: 'back', fontWeight: 'bolder' }} >Class Type</TableCell>
                            <TableCell className="text-center " style={{ color: 'back', fontWeight: 'bolder' }} >Medium</TableCell>
                            <TableCell className="text-center " style={{ color: 'back', fontWeight: 'bolder' }} >Day</TableCell>
                            <TableCell className="text-center " style={{ color: 'back', fontWeight: 'bolder' }} >Time</TableCell>
                            <TableCell className="text-center " style={{ color: 'back', fontWeight: 'bolder' }} >Note</TableCell>
                            <TableCell className="text-center  " style={{ color: 'back', fontWeight: 'bolder' }} >Status</TableCell>
                            <TableCell className="text-center hide-on-pdf " style={{ color: 'back', fontWeight: 'bolder' }} >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {data.map((row, index) => (
                            <TableRow key={row.id} >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.lid}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.subject}</TableCell>
                                <TableCell>{row.classMode}</TableCell>
                                <TableCell>{row.classType}</TableCell>
                                <TableCell>{row.medium}</TableCell>
                                <TableCell>{row.day}</TableCell>
                                <TableCell>{row.time}</TableCell>
                                <TableCell>{row.note}</TableCell>
                                <TableCell >{row.status}</TableCell>
                                <TableCell className="hide-on-pdf">
                                    <IconButton onClick={() => handleOpenEdit(row)}><Edit /></IconButton>
                                    <IconButton onClick={() => handleDelete(row.id)}><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog open={openEdit} onClose={handleCloseEdit}>
                    <DialogTitle>Edit Timetable</DialogTitle>
                    <DialogContent>
                        <TextField
                            className='mb-4'

                            name="name"
                            label="Lecturer Name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            className='mb-4'

                            name="subject"
                            label="Subject"
                            value={formData.subject || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                        <FormControl fullWidth
                            className='mb-4'
                        >
                            <InputLabel>Class</InputLabel>
                            <Select
                                name="classMode"
                                value={formData.classMode || ''}
                                onChange={handleChange}
                            >
                                <MenuItem value="Physical">Physical</MenuItem>
                                <MenuItem value="Online">Online</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth
                            className='mb-4'
                        >
                            <InputLabel>Class Type</InputLabel>
                            <Select
                                name="classType"
                                value={formData.classType || ''}
                                onChange={handleChange}
                            >
                                <MenuItem value="Theory">Theory</MenuItem>
                                <MenuItem value="Paper">Paper</MenuItem>
                                <MenuItem value="Revision">Revision</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth
                            className='mb-4'
                        >
                            <InputLabel>Medium</InputLabel>
                            <Select
                                name="medium"
                                value={formData.medium || ''}
                                onChange={handleChange}
                            >
                                <MenuItem value="English">English</MenuItem>
                                <MenuItem value="Sinhala">Sinhala</MenuItem>
                                <MenuItem value="Tamil">Tamil</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            className='mb-4'

                            name="day"
                            label="Day"
                            value={formData.day || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            className='mb-4'
                            name="time"
                            label="Time"
                            value={formData.time || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            className='mb-4'
                            name="note"
                            label="Note"
                            value={formData.note || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                        <FormControl fullWidth
                            className='mb-4'
                        >
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                value={formData.status || ''}
                                onChange={handleChange}
                            >
                                <MenuItem value="Visible">Visible</MenuItem>
                                <MenuItem value="Hidden">Hidden</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openAdd} onClose={handleCloseAdd}>
                    <DialogTitle className='text-center  text-green-700 font-bold'>Add New Timetable</DialogTitle>
                    <DialogContent>
                        <br />
                        <FormControl fullWidth className='mb-4'>
                            {/* <InputLabel>Upload Excel or Fill Manually</InputLabel> */}
                            <Select
                                value={excel ? 'Excel' : 'Manual'}
                                onChange={(e) => setExcel(e.target.value === 'Excel')}
                            >
                                <MenuItem value="Excel">Excel</MenuItem>
                                <MenuItem value="Manual">Manual</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        {excel && (
                            <TextField
                                type="file"
                                fullWidth
                                onChange={(e) => setSelectedFile(e.target.files[0])} // Store the selected file
                            />

                        )}
                        {!excel && (
                            <>
                                <TextField
                                    name="lid"
                                    label="Lecturer ID"
                                    value={formData.lid || ''}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <br />
                                <Button onClick={() => setManualInput(!manualInput)}>{manualInput ? 'Use Existing Data' : 'Manual Input'}</Button>
                                <br />
                                {manualInput ? (
                                    <>
                                        <TextField
                                            name="name"
                                            className='mb-4'
                                            label="Lecturer Name"
                                            value={formData.name || ''}
                                            onChange={handleChange}
                                            fullWidth
                                        />

                                        <TextField
                                            name="subject"
                                            className='mb-4'
                                            label="Subject"
                                            value={formData.subject || ''}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Autocomplete
                                            className='mb-4'
                                            options={data.filter(item => item.lid === formData.lid)}
                                            getOptionLabel={(option) => option.name}
                                            renderInput={(params) => <TextField {...params} label="Lecturer Name" />}
                                            onChange={(e, value) => value && setFormData({ ...formData, name: value.name })}
                                        />
                                        <Autocomplete
                                            className='mb-4'
                                            options={data.filter(item => item.lid === formData.lid)}
                                            getOptionLabel={(option) => option.subject}
                                            renderInput={(params) => <TextField {...params} label="Subject" />}
                                            onChange={(e, value) => value && setFormData({ ...formData, subject: value.subject })}
                                        />
                                    </>
                                )}
                                <FormControl fullWidth
                                    className='mb-4'
                                >
                                    <InputLabel>Class</InputLabel>
                                    <Select
                                        name="classMode"
                                        value={formData.classMode || ''}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Physical">Physical</MenuItem>
                                        <MenuItem value="Online">Online</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth
                                    className='mb-4'
                                >
                                    <InputLabel>Class Type</InputLabel>
                                    <Select
                                        name="classType"
                                        value={formData.classType || ''}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Theory">Theory</MenuItem>
                                        <MenuItem value="Paper">Paper</MenuItem>
                                        <MenuItem value="Revision">Revision</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth
                                    className='mb-4'
                                >
                                    <InputLabel>Medium</InputLabel>
                                    <Select
                                        name="medium"
                                        value={formData.medium || ''}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="English">English</MenuItem>
                                        <MenuItem value="Sinhala">Sinhala</MenuItem>
                                        <MenuItem value="Tamil">Tamil</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    className='mb-4'

                                    name="day"
                                    label="Day"
                                    value={formData.day || ''}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    className='mb-4'
                                    name="time"
                                    label="Time"
                                    value={formData.time || ''}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    className='mb-4'
                                    name="note"
                                    label="Note"
                                    value={formData.note || ''}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <FormControl fullWidth
                                    className='mb-4'
                                >
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="status"
                                        value={formData.status || ''}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Visible">Visible</MenuItem>
                                        <MenuItem value="Hidden">Hidden</MenuItem>
                                    </Select>
                                </FormControl>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAdd}>Cancel</Button>
                        {!excel && (<Button onClick={handleAdd}>Add</Button>)}
                        {excel && (
                            <Button onClick={handleAddF}>Add</Button>)}
                    </DialogActions>
                </Dialog>

                <Dialog open={openFilter} onClose={handleCloseFilter}>
                    <DialogTitle className='text-center'>Filter Timetable</DialogTitle>
                    <DialogContent style={{ maxWidth: '450px', minWidth: '450px' }}>
                        <TextField
                            className='mb-4'
                            name="lid"
                            label="Lecturer ID"
                            value={filterData.lid || ''}
                            onChange={handleFilterChange}
                            fullWidth
                        />
                        <FormControl fullWidth
                            className='mb-4'
                        >
                            <InputLabel>Class</InputLabel>
                            <Select
                                name="classMode"
                                value={filterData.classMode || ''}
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Physical">Physical</MenuItem>
                                <MenuItem value="Online">Online</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth
                            className='mb-4'
                        >
                            <InputLabel>Class Type</InputLabel>
                            <Select
                                name="classType"
                                value={filterData.classType || ''}
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Theory">Theory</MenuItem>
                                <MenuItem value="Paper">Paper</MenuItem>
                                <MenuItem value="Revision">Revision</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth
                            className='mb-4'
                        >
                            <InputLabel>Medium</InputLabel>
                            <Select
                                name="medium"
                                value={filterData.medium || ''}
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="English">English</MenuItem>
                                <MenuItem value="Sinhala">Sinhala</MenuItem>
                                <MenuItem value="Tamil">Tamil</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleResetFilter}>Reset</Button>
                        <Button onClick={applyFilter}>Apply</Button>
                    </DialogActions>
                </Dialog>

                <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                    <Alert severity={alertSeverity} onClose={handleAlertClose}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </TableContainer >

        </>

    );
};

export default TimeTableT;
