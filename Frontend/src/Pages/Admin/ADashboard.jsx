import React, { useState } from 'react';
import { Grid, TextField, Button, Pagination, Autocomplete, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel, Input } from '@mui/material';
import HeaderCard from '../../Comporant/Admin/Card/HeaderCard';
import teacher from '../../../public/Icon/teacher.png';
import notification from '../../../public/Icon/notification.png';
import news from '../../../public/Icon/news.png';
import image from '../../../public/Icon/picture.png';
import timeS from '../../../public/Image/smTime.jpg';
import { Color, Font } from '../../Comporant/CSS/Css';
import TimeTable from '../../Comporant/TimeTable/TimeTable';
import TimeTableT from '../../Comporant/Admin/Table/TimeTableT';
import BasicSpeedDial from '../../Comporant/ChatBot/SpeedDial';


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


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div style={rootStyle}>
      <BasicSpeedDial/>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <HeaderCard icon={teacher} title="Lecturers" count="110" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <HeaderCard icon={news} title="News Feed" count="10" />
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
        <Grid item xs={12} sm={12} md={12}>
          <div className="text-center" style={{ fontFamily: Font.PrimaryFont }}>
            <h2 style={{color:Color.PrimaryColor,fontWeight:'bolder'}}>Time Table of Stream</h2>
          </div>
          <TimeTableT/>
        </Grid>
    
      </Grid>
    </div>

  );
}
