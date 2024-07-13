import React, { useState } from 'react';
import { Grid, TextField, Button, Pagination, Autocomplete, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel, Input } from '@mui/material';
import HeaderCard from '../../Comporant/Admin/Card/HeaderCard';
import teacher from '../../../public/Icon/teacher.png';
import notification from '../../../public/Icon/notification.png';
import subject from '../../../public/Icon/books.png';
import image from '../../../public/Icon/picture.png';
import timeS from '../../../public/Image/smTime.jpg';
import { Font } from '../../Comporant/CSS/Css';
import TimeTable from '../../Comporant/Admin/Card/TimeTable';

const ITEMS_PER_PAGE = 4; // Number of tables to show per page

// Sample data for time tables with class types
let sampleTimeTables = [
  { title: 'Mathematics Time Table 2024', image: timeS, classType: 'teary' },
  { title: 'Science Time Table 2023', image: timeS, classType: 'revision' },
  { title: 'History Time Table 2025', image: timeS, classType: 'paper' },
  { title: 'Geography Time Table 2024', image: timeS, classType: 'teary' },
  { title: 'English Time Table 2026', image: timeS, classType: 'revision' },
  { title: 'Physics Time Table 2024', image: timeS, classType: 'paper' },
  { title: 'Chemistry Time Table 2023', image: timeS, classType: 'teary' },
  { title: 'Biology Time Table 2025', image: timeS, classType: 'revision' },
  // Add more time tables as needed
];

export default function ADashboard() {
  const [filter, setFilter] = useState('');
  const [filteredTimeTables, setFilteredTimeTables] = useState(
    sampleTimeTables.filter(table => table.classType === 'teary')
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [openForm, setOpenForm] = useState(false); // State for controlling the popup form

  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null); // State to store selected image file
  const [classType, setClassType] = useState('');
  const [year, setYear] = useState('');
  const [selectedYearFilter, setSelectedYearFilter] = useState(''); // State for selected year filter

  const currentYear = new Date().getFullYear();
  const last3Years = [currentYear - 2, currentYear - 1, currentYear];

  const rootStyle = {
    flexGrow: 1,
    padding: '10px',
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    filterTimeTables(value, tabValue, selectedYearFilter); // Pass year filter as well
  };

  const filterTimeTables = (value, selectedTab, selectedYear) => {
    const filtered = sampleTimeTables.filter((table) => {
      const includesFilter = table.title.toLowerCase().includes(value.toLowerCase());
      const year = parseInt(table.title.split(" ")[table.title.split(" ").length - 1]);

      // Filter based on selected tabValue and year
      return includesFilter &&
        (selectedTab === 0 ? table.classType === 'teary' :
          selectedTab === 1 ? table.classType === 'revision' :
            selectedTab === 2 ? table.classType === 'paper' : true) &&
        (selectedYear ? year.toString() === selectedYear.toString() : true);
    });

    setFilteredTimeTables(filtered);
    setCurrentPage(1); // Reset to the first page when filter changes
    setIsFilterActive(!!value || !!selectedYear); // Update filter active state
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handleAutocompleteChange = (event, value) => {
    if (value) {
      setFilter(value.title);
      filterTimeTables(value.title, tabValue, selectedYearFilter); // Pass year filter as well
    } else {
      setFilter('');
      setFilteredTimeTables(sampleTimeTables);
      setIsFilterActive(!!selectedYearFilter); // Update filter active state
    }
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    // Clear form fields on close
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
    filterTimeTables(filter, tabValue, selectedYearFilter); // Apply current filter if active
    setOpenForm(false); // Close the form after adding
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

  return (
    <div style={rootStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <HeaderCard icon={teacher} title="Lectures" count="110" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <HeaderCard icon={subject} title="Subjects" count="10" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <HeaderCard icon={image} title="Images" count="10" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <HeaderCard icon={notification} title="Notification" count="0" />
        </Grid>
      </Grid>
      <br /><br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={12}>
          <div className="text-center" style={{ fontFamily: Font.PrimaryFont }}>
            <h2 className='text-bg-secondary p-2'>Time Table</h2>
          </div>
          <Grid item xs={12} sm={3} md={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenForm}
              style={{ marginTop: '20px' }}
            >
              Add Time Table
            </Button>
          </Grid>
          <div className="d-flex justify-content-center">
            <Grid item xs={12} sm={4} md={4}>
              <Tabs
                value={tabValue}
                onChange={(event, newValue) => {
                  setTabValue(newValue);
                  filterTimeTables(filter, newValue, selectedYearFilter); // Update filter when tab changes
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
            </Grid>
          </div>

          <br />
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} sm={12} md={8}>
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
                    style={{ backgroundColor: isFilterActive ? '#f0f0f0' : 'transparent' }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>

              <FormControl fullWidth>
                <InputLabel id="year-filter-label">Year</InputLabel>
                <Select
                  labelId="year-filter-label"
                  id="year-filter"
                  value={selectedYearFilter}
                  onChange={(e) => {
                    setSelectedYearFilter(e.target.value);
                    filterTimeTables(filter, tabValue, e.target.value); // Update filter when year changes
                  }}
                  label="Year"
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

          </Grid>
          <br />
          <Grid container spacing={2}>
            {filteredTimeTables.slice(startIndex, endIndex).map((table, index) => (
              <Grid item xs={12} sm={3} md={3} key={index}>
                <TimeTable image={table.image} title={table.title} />
              </Grid>
            ))}

          </Grid>
          <Pagination
            count={Math.ceil(filteredTimeTables.length / ITEMS_PER_PAGE)}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
            style={{ marginTop: '20px' }} // Adjust margin top as needed
          />
        </Grid>
      </Grid>

      {/* Popup Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Time Table</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputLabel htmlFor="image-upload">Select Image</InputLabel>
          <Input
            type="file"
            id="image-upload"
            onChange={handleImageChange}
            style={{ marginBottom: '10px' }}
          />
          <FormControl fullWidth>
            <InputLabel id="class-type-label">Class Type</InputLabel>
            <Select
              labelId="class-type-label"
              id="class-type"
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              label="Class Type"
            >
              <MenuItem value="teary">Teary</MenuItem>
              <MenuItem value="revision">Revision</MenuItem>
              <MenuItem value="paper">Paper Class</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginTop: '10px' }}>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              label="Year"
            >
              {last3Years.map((yr) => (
                <MenuItem key={yr} value={yr}>
                  {yr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTimeTable} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
