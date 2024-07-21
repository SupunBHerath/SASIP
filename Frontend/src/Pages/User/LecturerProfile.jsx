import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TimeTableCard from "../../Comporant/TimeTable/TimeTableCard";
import { Grid, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import SubjectIcon from "@mui/icons-material/Subject";
import StreamIcon from "@mui/icons-material/Category";
import MediumIcon from "@mui/icons-material/Language";
import ExperienceIcon from "@mui/icons-material/Work";
import { Color } from "../../Comporant/CSS/Css";
import Navbar from "../../Comporant/Navibar/Navbar";

export default function Profile() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [timetables, setTimetables] = useState([]);
  const [filteredTimetables, setFilteredTimetables] = useState([]);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [filters, setFilters] = useState({
    year: "",
    classType: "",
    class: ""
  });

  useEffect(() => {
    const fetchTeacherAndTimetables = async () => {
      try {
        // Fetch teacher details
        const teacherResponse = await axios.get(`/api/teacher/profile/${id}`);
        setTeacher(teacherResponse.data);

        // Fetch timetable details
        const timetableResponse = await axios.get(`/api/timetable/display-timetable/${id}`);
        setTimetables(timetableResponse.data);
        setFilteredTimetables(timetableResponse.data); // Initialize filteredTimetables
      } catch (error) {
        console.error("Error fetching teacher details or timetables: ", error);
      }
    };

    fetchTeacherAndTimetables();
  }, [id]);

  const handleClickOpen = () => {
    setOpenFilterDialog(true);
  };

  const handleClose = () => {
    setOpenFilterDialog(false);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = () => {
    const { year, classType, class: className } = filters;

    const filtered = timetables.filter(timetable => {
      return (
        (year ? timetable.year === year : true) &&
        (classType ? timetable.classType === classType : true) &&
        (className ? timetable.classMode === className : true)
      );
    });

    setFilteredTimetables(filtered);
    handleClose();
  };

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar  fixed={true} />
      <div className="container" id="c">
        <div className="w-full p-6 bg-card text-card-foreground">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img
              src={teacher.imageUrl}
              style={{ height: "407px" }}
              alt="Profile Picture"
              className="md:mr-6 mb-6 md:mb-0 rounded-lg"
            />
            <div className="flex-1">
              <div className="bg-black text-primary-foreground p-6 rounded-lg shadow-md w-100" >
                <h2 className="text-5xl font-bold">{teacher.name}</h2>
                <br />
                <br />
                <table>
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: '80px' }}>
                        <span className="mt-5 widget-text-xl">
                          <SubjectIcon
                            style={{ verticalAlign: "middle", marginRight: "10px", marginTop: '-15px', color: Color.PrimaryColor }}
                          />
                          <strong className="h2" style={{ color: Color.PrimaryColor }}>Subject </strong>
                        </span>
                      </td>
                      <td >
                        <span className="mt-5 widget-text-xl">
                          <span className="h3">: {teacher.subject} </span>
                        </span>
                      </td>
                    </tr>
                    <br />
                    <tr style={{ marginBottom: '20px' }}>
                      <td>
                        <span className="mt-5 widget-text-xl">
                          <StreamIcon
                            style={{ verticalAlign: "middle", marginRight: "10px", marginTop: '-15px', color: Color.PrimaryColor }}
                          />
                          <strong className="h2" style={{ color: Color.PrimaryColor }}>Stream </strong>
                        </span>
                      </td>

                      <td>
                        <span className="mt-5 widget-text-xl">
                          <span className="h3">: {teacher.stream} </span>
                        </span>
                      </td>
                    </tr>
                    <br />
                    <tr style={{ marginBottom: '20px' }}>
                      <td>
                        <span className="mt-5 widget-text-xl">
                          <MediumIcon
                            style={{ verticalAlign: "middle", marginRight: "10px", marginTop: '-15px', color: Color.PrimaryColor }}
                          />
                          <strong className="h2" style={{ color: Color.PrimaryColor }}>Medium </strong>
                        </span>
                      </td>
                      <td>
                        <span className="mt-5 widget-text-xl">
                          <span className="h3">: {teacher.medium.join(" / ")} </span>
                        </span>
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td>
                        <span className="mt-5 widget-text-xl">
                          <ExperienceIcon
                            style={{ verticalAlign: "middle", marginRight: "10px", marginTop: '-15px', color: Color.PrimaryColor }}
                          />
                          <strong className="h2" style={{ color: Color.PrimaryColor }}>Experience </strong>
                        </span>
                      </td>
                      <td>
                        <span className="mt-5 widget-text-xl">
                          <span className="h3">: {teacher.experience}</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex space-x-4 mt-4">
                {teacher.socialMedia.facebook && (
                  <a
                    href={teacher.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 inline-block rounded bg-[#1877f2] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                )}
                {teacher.socialMedia.youtube && (
                  <a
                    href={teacher.socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 inline-block rounded bg-[#ff0000] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                )}
                {teacher.socialMedia.website && (
                  <a
                    href={teacher.socialMedia.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 inline-block rounded bg-[#0088cc] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                  >
                    <i className="fas fa-globe"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
          <hr className="my-6 border-muted" />
          <div>
            <h3 className="widget-subtitle font-bold">Bio</h3>
            <p className="text-muted-foreground mt-2 widget-text-xl">
              {teacher.bio}
            </p>
          </div>
          <hr className="my-6 border-muted" />
          <div>
            <h3 className="widget-subtitle font-bold">Qualifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {teacher.qualifications.map((qualification, index) => (
                <div
                  key={index}
                  className="bg-accent text-accent-foreground p-6 rounded-lg shadow-md flex items-center transform hover:scale-105 transition duration-500"
                >
                  <img
                    src={qualification.fileUrl}
                    alt="Qualification Icon"
                    className="w-12 h-12 rounded-full mr-6"
                  />
                  <div>
                    <h4 className="font-bold">{qualification.name}</h4>
                    <p className="text-muted-foreground">
                      {qualification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr className="my-6 border-muted" />
          <div>
            <div className="flex items-center justify-between">
              <h3 className="widget-subtitle font-bold">Timetables</h3>
              <IconButton onClick={handleClickOpen} color="primary">
                <FilterListIcon />
              </IconButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {filteredTimetables.length > 0 ? (
                filteredTimetables.map((timetable, index) => (
                  <div key={index}>
                    <Grid item xs={12} sm={8} md={4} key={index} className='justify-content-center d-flex'>
                      <TimeTableCard
                        subjectName={timetable.subject}
                        year={timetable.year}
                        lecture={timetable.name}
                        day={timetable.day}
                        time={timetable.time}
                        classMode={timetable.classMode}
                        medium={timetable.medium}
                        classType={timetable.classType}
                        fileUrl={timetable.fileUrl}
                      />
                    </Grid>
                  </div>
                ))
              ) : (
                <p>No timetables found for the selected filters.</p>
              )}
            </div>
          </div>
          <Dialog open={openFilterDialog} onClose={handleClose}>
            <DialogTitle>Filter Timetables</DialogTitle>
            <DialogContent style={{ minWidth: '350px' }}>
              <TextField
                select
                label="Year"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
              </TextField>
              <TextField
                select
                label="Class Type"
                name="classType"
                value={filters.classType}
                onChange={handleFilterChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Theory">Theory</MenuItem>
                <MenuItem value="Paper">Paper</MenuItem>
                <MenuItem value="Revision">Revision</MenuItem>
              </TextField>
              <TextField
                select
                label="Class"
                name="class"
                value={filters.class}
                onChange={handleFilterChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Physical">Physical</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={applyFilters} color="primary">
                Apply
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}
