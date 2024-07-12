import React from 'react';
import { Grid } from '@mui/material';
import HeaderCard from '../../Comporant/Admin/Card/HeaderCard';
import teacher from '../../../public/Icon/teacher.png'
export default function ADashboard() {
  const rootStyle = {
    flexGrow: 1,
    padding: '100px',
  };

  

  return (
    <div style={rootStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
            <HeaderCard   title="Lechers" count="110" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <HeaderCard title="Subjects" count="10" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <HeaderCard title="Images" count="10" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            {/* <HeaderCard title="Notification" count="0" /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <HeaderCard title="Notification" count="0" />
        </Grid>
      </Grid>
    </div>
  );
}
