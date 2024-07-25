import React, { useState } from 'react';
import { Grid, TextField, Button, Pagination, Autocomplete, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel, Input } from '@mui/material';
import HeaderCard from '../../Comporant/Admin/Card/HeaderCard';
import teacher from '../../../public/Icon/teacher.png';
import notification from '../../../public/Icon/notification.png';
import news from '../../../public/Icon/news.png';
import image from '../../../public/Icon/picture.png';
import { Color, Font } from '../../Comporant/CSS/Css';
import TimeTableT from '../../Comporant/Admin/Table/TimeTableT';
import BasicSpeedDial from '../../Comporant/ChatBot/SpeedDial';




export default function ADashboard() {

  const rootStyle = {
    flexGrow: 1,
    padding: '10px',
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
