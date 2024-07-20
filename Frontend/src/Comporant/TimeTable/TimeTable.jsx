import React, { useState,useEffect } from 'react';
import { Grid, TextField, Pagination, Autocomplete, Tabs, Tab, FormControl, InputLabel, Select, MenuItem, useMediaQuery, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import TimeTableCard from './TimeTableCard';
import { Color } from '../CSS/Css';
import Navbar from '../Navibar/Navbar';
import axios from 'axios';



const TimeTable = () => {
    const [sampleTimeTables, setSampleTimeTables] = useState([]);
    const [filteredTimeTables, setFilteredTimeTables] = useState(sampleTimeTables);

    useEffect(() => {
        const fetchTimeTables = async () => {
            try {
                const response = await axios.get('/api/timetable/display-timetable'); // Update the URL to your actual API endpoint
                if (response.status === 200) {
                    const formattedData = response.data.map(item => ({
                        Class: item.classMode,
                        medium: item.medium,
                        subjectName: item.subject,
                        year: new Date(item.createdAt._seconds * 1000).getFullYear().toString(),
                        lecture: item.name,
                        day: item.day,
                        time: item.time,
                        classType: item.classType
                    }));
                    setSampleTimeTables(formattedData);
                }
            } catch (error) {
                console.error('Error fetching timetables:', error);
            }
        };

        fetchTimeTables();
    }, []);

    useEffect(() => {
        // Log the sampleTimeTables when it changes
        console.log(sampleTimeTables);
        setFilteredTimeTables(sampleTimeTables)
    }, [sampleTimeTables]);


    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [tabValue, setTabValue] = useState(0);
    const [selectedYearFilter, setSelectedYearFilter] = useState('');
    const [selectedClassFilter, setSelectedClassFilter] = useState('');
    const [openFilterDialog, setOpenFilterDialog] = useState(false);
    const [lectureFilter, setLectureFilter] = useState('');
    const currentYear = new Date().getFullYear();
    const last3Years = [currentYear - 1, currentYear, currentYear + 1];
    const isSmallScreen = useMediaQuery('(max-width:800px)'); // Check for small screens

    // Number of items per page based on screen size
    const ITEMS_PER_PAGE = isSmallScreen ? 4 : 10;


    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        filterTimeTables(value, tabValue, selectedYearFilter, selectedClassFilter);
    };

    const handleLectureFilterChange = (e) => {
        const value = e.target.value;
        setLectureFilter(value);
        filterTimeTables(value, tabValue, selectedYearFilter, selectedClassFilter);
    };
    // Filter time tables based on current filters
    const filterTimeTables = (value, selectedTab, selectedYear, selectedClass) => {
        console.log(selectedTab);
        const filtered = sampleTimeTables.filter((table) => {
            const includesFilter = table.subjectName.toLowerCase().includes(value.toLowerCase());
            const yearMatch = selectedYear ? table.year.toString() === selectedYear.toString() : true;
            const classMatch = selectedClass ? table.Class.toLowerCase() === selectedClass.toLowerCase() : true;
            const tabType = getTabType(selectedTab).toLowerCase();
            // Check if table matches the selected tab type
            const typeMatch = selectedTab === 0 || tabType === '' || table.classType.toLowerCase() === tabType;
 
            return includesFilter && typeMatch && yearMatch && classMatch;
        });

        setFilteredTimeTables(filtered);
        setCurrentPage(1);
    };

    // Function to get tab type based on index
    const getTabType = (tabIndex) => {
        console.log(tabIndex);
        switch (tabIndex) {
            case 0:
                return ''; // All
            case 1:
                return 'theory'; // Theory
            case 2:
                return 'revision'; // Revision
            case 3:
                return 'paper'; // Paper Class
            case 4:
                return 'other'; // Other
            default:
                return '';
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const handleAutocompleteChange = (event, value) => {
        if (value) {
            setFilter(value.subjectName);
            filterTimeTables(value.subjectName, tabValue, selectedYearFilter, selectedClassFilter);
        } else {
            setFilter('');
            setFilteredTimeTables(sampleTimeTables);
        }
    };

    const handleDialogOpen = () => {
        setOpenFilterDialog(true);
    };

    const handleDialogClose = () => {
        setOpenFilterDialog(false);
    };

    return (
        <div >
            <Navbar position={true} />

            <Grid container spacing={2} justify="center" className='' >
                <div className="w-100 p-2 mt-3" style={{ backgroundColor: Color.PrimaryColor, position: 'sticky', top: 0, zIndex: 1000 }}>

                    <Grid container spacing={2} alignItems="center" className='d-flex justify-content-center'>
                        <Grid item xs={10} sm={10} md={3}>
                            <TextField
                                fullWidth
                                label="Search by Lecture"
                                variant="outlined"
                                value={lectureFilter}
                                onChange={handleLectureFilterChange}
                                size="medium"
                                InputLabelProps={{
                                    style: { color: '#ffffff' }, // label color
                                }}
                                InputProps={{
                                    style: { color: '#ffffff' }, // input text color
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#ffffff',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#ffffff',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#ffffff',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff',
                                    },
                                    '& .MuiInputBase-root': {
                                        color: '#ffffff',
                                    },
                                }}
                            />
                        </Grid>
                        {!isSmallScreen && (
                            <>
                                <Grid item xs={10} sm={5} md={3}>
                                    <Autocomplete
                                        fullWidth
                                        options={sampleTimeTables}
                                        getOptionLabel={(option) => option.subjectName}
                                        value={sampleTimeTables.find((option) => option.subjectName === filter) || null}
                                        onChange={handleAutocompleteChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Filter by Subject"
                                                variant="outlined"
                                                size="medium"
                                                InputLabelProps={{
                                                    style: { color: '#ffffff' }, // label color
                                                }}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    style: { color: '#ffffff', borderColor: '#ffffff' }, // input text color
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#ffffff',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#ffffff',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#ffffff',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: '#ffffff',
                                                    },
                                                    '& .MuiInputBase-root': {
                                                        color: '#ffffff',
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={10} sm={4} md={1}>
                                    <FormControl fullWidth variant="outlined" size="medium"
                                        sx={{
                                            '& .MuiInputLabel-root': {
                                                color: '#ffffff',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#ffffff',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#ffffff',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#ffffff',
                                                },
                                            },
                                            '& .MuiSelect-icon': {
                                                color: '#ffffff',
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                color: '#ffffff',
                                            },
                                            '& .MuiMenuItem-root': {
                                                color: '#ffffff',
                                            },
                                        }}>
                                        <InputLabel id="year-filter-label">Year</InputLabel>
                                        <Select
                                            labelId="year-filter-label"
                                            id="year-filter"
                                            value={selectedYearFilter}
                                            style={{ color: '#000' }}
                                            onChange={(e) => {
                                                setSelectedYearFilter(e.target.value);
                                                filterTimeTables(filter, tabValue, e.target.value, selectedClassFilter);
                                            }}
                                            label="Filter by Year"
                                        >
                                            <MenuItem value="" sx={{ color: 'black' }}>All</MenuItem>
                                            {last3Years.map((yr) => (
                                                <MenuItem key={yr} value={yr} sx={{ color: 'black' }}>
                                                    {yr}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4} md={1}>
                                    <FormControl fullWidth variant="outlined" size="medium"
                                        sx={{
                                            '& .MuiInputLabel-root': {
                                                color: '#ffffff',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#ffffff',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#ffffff',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#ffffff',
                                                },
                                            },
                                            '& .MuiSelect-icon': {
                                                color: '#ffffff',
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                color: '#ffffff',
                                            },
                                            '& .MuiMenuItem-root': {
                                                color: '#ffffff',
                                            },
                                        }}
                                    >
                                        <InputLabel id="class-filter-label">Class</InputLabel>
                                        <Select
                                            labelId="class-filter-label"
                                            id="class-filter"
                                            value={selectedClassFilter}
                                            onChange={(e) => {
                                                setSelectedClassFilter(e.target.value);
                                                filterTimeTables(filter, tabValue, selectedYearFilter, e.target.value);
                                            }}
                                            label="Filter by Class"
                                        >
                                            <MenuItem value="">All</MenuItem>
                                            <MenuItem value="Physical">Physical</MenuItem>
                                            <MenuItem value="Online">Online</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </>
                        )}
                        {isSmallScreen && (
                            <Grid item xs={1} sm={1} md={3}>
                                <IconButton onClick={handleDialogOpen} style={{ color: '#ffffff' }}>
                                    <FilterListIcon />
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                </div>


                <Grid item xs={12}>
                    <div className="d-flex justify-content-center mb-3">
                        <Tabs
                            value={tabValue}
                            onChange={(event, newValue) => {
                                setTabValue(newValue);
                                filterTimeTables(filter, newValue, selectedYearFilter, selectedClassFilter);
                            }}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            <Tab label="All" />
                            <Tab label="Theory" />
                            <Tab label="Revision" />
                            <Tab label="Paper Class" />
                        </Tabs>
                    </div>
                    <Grid container spacing={2} className='justify-content-center d-flex'>
                        {filteredTimeTables.slice(startIndex, endIndex).map((table, index) => (
                            <Grid item xs={12} sm={8} md={4} key={index} className='justify-content-center d-flex'>
                                <TimeTableCard
                                    subjectName={table.subjectName}
                                    year={table.year}
                                    lecture={table.lecture}
                                    day={table.day}
                                    time={table.time}
                                    classType={table.classType}
                                    medium={table.medium}
                                    Class={table.Class}
                                    note={table.note}
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
            </Grid >

            <Dialog open={openFilterDialog} onClose={handleDialogClose}>
                <DialogTitle className='text-center'>Filter Options</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Use the filters below to narrow down the timetables.
                    </DialogContentText>
                    <br /><hr /><br />
                    <Grid item xs={10} sm={5} md={3}>

                        <Autocomplete
                            fullWidth
                            options={sampleTimeTables}
                            getOptionLabel={(option) => option.subjectName}
                            value={sampleTimeTables.find((option) => option.subjectName === filter) || null}
                            onChange={handleAutocompleteChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Filter by Subject"
                                    variant="outlined"
                                    size="medium"

                                />
                            )}
                        />
                    </Grid>


                    <FormControl fullWidth variant="outlined" size="medium" margin="dense">
                        <InputLabel id="year-filter-label-dialog">Filter by Year</InputLabel>
                        <Select
                            labelId="year-filter-label-dialog"
                            id="year-filter-dialog"
                            value={selectedYearFilter}
                            onChange={(e) => {
                                setSelectedYearFilter(e.target.value);
                                filterTimeTables(filter, tabValue, e.target.value, selectedClassFilter);
                            }}
                            label="Filter by Year"
                        >
                            <MenuItem value="">All</MenuItem>
                            {last3Years.map((yr) => (
                                <MenuItem key={yr} value={yr}>
                                    {yr}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" size="medium" margin="dense">
                        <InputLabel id="class-filter-label-dialog">Filter by Class</InputLabel>
                        <Select
                            labelId="class-filter-label-dialog"
                            id="class-filter-dialog"
                            value={selectedClassFilter}
                            onChange={(e) => {
                                setSelectedClassFilter(e.target.value);
                                filterTimeTables(filter, tabValue, selectedYearFilter, e.target.value);
                            }}
                            label="Filter by Class"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Grade 10">Grade 10</MenuItem>
                            <MenuItem value="Grade 11">Grade 11</MenuItem>
                            <MenuItem value="Grade 12">Grade 12</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
};

export default TimeTable;
