import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Pagination, Autocomplete, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import timeS from '../../../public/Image/smTime.jpg';
import { Color, Font } from '../CSS/Css';
import TimeTableCard from './TimeTableCard';

const ITEMS_PER_PAGE = 4;

let sampleTimeTables = [
    { title: 'Mathematics Time Table 2024', image: timeS, classType: 'teary' },
    { title: 'Science Time Table 2023', image: timeS, classType: 'revision' },
    { title: 'History Time Table 2025', image: timeS, classType: 'paper' },
    { title: 'Geography Time Table 2024', image: timeS, classType: 'teary' },
    { title: 'English Time Table 2026', image: timeS, classType: 'revision' },
    { title: 'Physics Time Table 2024', image: timeS, classType: 'paper' },
    { title: 'Chemistry Time Table 2023', image: timeS, classType: 'teary' },
    { title: 'Chemistry Time Table 2023', image: timeS, classType: 'teary' },
    { title: 'Chemistry Time Table 2023', image: timeS, classType: 'teary' },
    { title: 'Chemistry Time Table 2023', image: timeS, classType: 'teary' },
    { title: 'Biology Time Table 2025', image: timeS, classType: 'revision' },
];

export default function TimeTable() {
    const [filter, setFilter] = useState('');
    const [filteredTimeTables, setFilteredTimeTables] = useState(
        sampleTimeTables.filter(table => table.classType === 'teary')
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [openForm, setOpenForm] = useState(false);
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [classType, setClassType] = useState('');
    const [year, setYear] = useState('');
    const [selectedYearFilter, setSelectedYearFilter] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedImageTitle, setSelectedImageTitle] = useState('');
    const [isAdmin, setIsAdmin] = useState(true); // Default to false for non-admin users
    const [openAlert, setOpenAlert] = useState(false); // State for controlling alert visibility

    const currentYear = new Date().getFullYear();
    const last3Years = [currentYear - 1, currentYear, currentYear + 1];

    useEffect(() => {
        // Simulating admin role here, you would integrate this with your authentication logic
        setIsAdmin(true); // Set to true for admin role, false for regular users
    }, []); // Ensure this runs only once on component mount

    const rootStyle = {
        flexGrow: 1,
        padding: '10px',
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        filterTimeTables(value, tabValue, selectedYearFilter);
    };

    const filterTimeTables = (value, selectedTab, selectedYear) => {
        const filtered = sampleTimeTables.filter((table) => {
            const includesFilter = table.title.toLowerCase().includes(value.toLowerCase());
            const year = parseInt(table.title.split(" ")[table.title.split(" ").length - 1]);
            return includesFilter &&
                (selectedTab === 0 ? table.classType === 'teary' :
                    selectedTab === 1 ? table.classType === 'revision' :
                        selectedTab === 2 ? table.classType === 'paper' : true) &&
                (selectedYear ? year.toString() === selectedYear.toString() : true);
        });

        setFilteredTimeTables(filtered);
        setCurrentPage(1);
        setIsFilterActive(!!value || !!selectedYear);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const handleAutocompleteChange = (event, value) => {
        if (value) {
            setFilter(value.title);
            filterTimeTables(value.title, tabValue, selectedYearFilter);
        } else {
            setFilter('');
            setFilteredTimeTables(sampleTimeTables);
            setIsFilterActive(!!selectedYearFilter);
        }
    };

    const handleOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setTitle('');
        setImageFile(null);
        setClassType('');
        setYear('');
    };

    const handleAddTimeTable = () => {
        const newTimeTable = {
            title: title.trim() !== '' ? title : `New Time Table ${sampleTimeTables.length + 1}`,
            image: imageFile ? URL.createObjectURL(imageFile) : timeS,
            classType: classType || 'teary',
            year: year || '',
        };
        sampleTimeTables = [...sampleTimeTables, newTimeTable];
        filterTimeTables(filter, tabValue, selectedYearFilter);
        setOpenForm(false);
        setTitle('');
        setImageFile(null);
        setClassType('');
        setYear('');
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleCardClick = (image, title) => {
        setSelectedImage(image);
        setSelectedImageTitle(title);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedImage('');
        setSelectedImageTitle('');
    };

    const handleEdit = () => {
        // Implement edit functionality
        setOpenAlert(true); // Show alert after edit
    };

    const handleDelete = () => {
        // Implement delete functionality
        setOpenAlert(true); // Show alert after delete
    };

    return (
        <div style={rootStyle}>
            <br />
            <Grid container spacing={2}>
                <Grid container spacing={2} alignItems="center" className='justify-content-center' style={{backgroundColor:Color.PrimaryColor}} >
                    <Grid item xs={12} sm={6} md={4}>
                        <Autocomplete
                            fullWidth
                            options={sampleTimeTables}
                            getOptionLabel={(option) => option.title}
                            value={sampleTimeTables.find((option) => option.title === filter) || null}
                            onChange={handleAutocompleteChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Filter"
                                    variant="outlined"
                                    size="medium"
                                    style={{ backgroundColor: isFilterActive ? '#f0f0f0' : 'transparent', float: 'right' }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="year-filter-label">Year</InputLabel>
                            <Select
                                labelId="year-filter-label"
                                id="year-filter"
                                value={selectedYearFilter}
                                onChange={(e) => {
                                    setSelectedYearFilter(e.target.value);
                                    filterTimeTables(filter, tabValue, e.target.value);
                                }}
                                label="Year"
                                style={{ maxWidth: '400px' }}
                            >
                                <MenuItem value="">All</MenuItem>
                                {last3Years.map((yr) => (
                                    <MenuItem key={yr} value={yr}>
                                        {yr}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* <br /> */}
                </Grid>
                <Grid item xs={12}>
                    <div className="d-flex justify-content-center">
                        <Tabs
                            value={tabValue}
                            onChange={(event, newValue) => {
                                setTabValue(newValue);
                                filterTimeTables(filter, newValue, selectedYearFilter);
                            }}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            <Tab label="Teary" />
                            <Tab label="Revision" />
                            <Tab label="Paper Class" />
                        </Tabs>
                    </div>

                    <br />

                    <br />
                    <Grid container spacing={2} className='justify-content-center d-flex'>
                        {filteredTimeTables.slice(startIndex, endIndex).map((table, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index} className='justify-content-center d-flex'>
                                <TimeTableCard
                                    image={table.image}
                                    title={table.title}
                                    onClick={() => handleCardClick(table.image, table.title)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count={Math.ceil(filteredTimeTables.length / ITEMS_PER_PAGE)}
                        color="primary"
                        page={currentPage}
                        onChange={handlePageChange}
                        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                    />
                </Grid>
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle className='text-center text-bg-success' style={{ fontFamily: Font.PrimaryFont }}>{selectedImageTitle}</DialogTitle>
                <DialogContent>
                    <img src={selectedImage} alt={selectedImageTitle} style={{ width: '100%' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = selectedImage;
                            link.download = selectedImageTitle;
                            link.click();
                        }}
                    >
                        Download
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for showing alerts */}
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
                <Alert onClose={() => setOpenAlert(false)} severity="success">
                    Action completed successfully!
                </Alert>
            </Snackbar>
        </div>
    );
}
