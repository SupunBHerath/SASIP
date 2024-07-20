import React, { useState, useEffect } from "react";
import TeamCard from "../../Comporant/Card/TeamCard";
import "./team.css";
import { IconButton, Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem, FormControl, InputLabel, Button, Pagination } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Navbar from "../../Comporant/Navibar/Navbar";
import ScrollToTopButton from "../../Comporant/ScrollToTopButton/ScrollToTopButton";
import axios from "axios";

const Team = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [language, setLanguage] = useState("English");
  const [showNameSuggestions, setShowNameSuggestions] = useState(false);
  const [showSubjectSuggestions, setShowSubjectSuggestions] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [classType, setClassType] = useState("");
  const [medium, setMedium] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teamData, setTeamData] = useState([]); // State to store fetched data
  const itemsPerPage = 12;

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/teacher/display-teachers"); 
        setTeamData(response.data.teachers);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const filteredTeam = teamData.filter((member) => {
    const nameMatches = member.name.toLowerCase().includes(nameFilter.toLowerCase());
    const subjectMatches = member.subject.toLowerCase().includes(subjectFilter.toLowerCase());
    return nameMatches && subjectMatches;
  });

  const nameSuggestions = teamData.filter((member) =>
    member.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const subjectSuggestions = teamData.filter((member) =>
    member.subject.toLowerCase().includes(subjectFilter.toLowerCase())
  );

  const handleNameSuggestionClick = (suggestion) => {
    setNameFilter(suggestion.name);
    setShowNameSuggestions(false);
  };

  const handleSubjectSuggestionClick = (suggestion) => {
    setSubjectFilter(suggestion.subject);
    setShowSubjectSuggestions(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTeam.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTeam.length / itemsPerPage);

  return (
    <>
      <Navbar position={true}/>
      <div className="teacher">
        <div className={`filters-container ${scrolling ? "hidden" : ""}`}>
          <div className="filters">
            <div className="filter-input">
              <input
                type="text"
                placeholder="Filter by Name"
                value={nameFilter}
                onChange={(e) => {
                  setNameFilter(e.target.value);
                  setShowNameSuggestions(e.target.value.length > 0);
                }}
              />
              {showNameSuggestions && nameSuggestions.length > 0 && (
                <ul className="suggestions">
                  {nameSuggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleNameSuggestionClick(suggestion)}>
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="filter-input">
              <input
                type="text"
                placeholder="Filter by Subject"
                value={subjectFilter}
                onChange={(e) => {
                  setSubjectFilter(e.target.value);
                  setShowSubjectSuggestions(e.target.value.length > 0);
                }}
              />
              {showSubjectSuggestions && subjectSuggestions.length > 0 && (
                <ul className="suggestions">
                  {subjectSuggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSubjectSuggestionClick(suggestion)}>
                      {suggestion.subject}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-select">
              <option value="English">English</option>
              <option value="Sinhala">Sinhala</option>
            </select>

            <IconButton onClick={handleDialogOpen}>
              <FilterListIcon />
            </IconButton>
          </div>
        </div>

        <Dialog open={openDialog} onClose={handleDialogClose} >
          <DialogTitle>Filter Options</DialogTitle>
          <DialogContent style={{minWidth:'250px'}}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Class Type</InputLabel>
              <Select
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
              >
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Physical">Physical</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Medium</InputLabel>
              <Select
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
              >
                <MenuItem value="Sinhala">Sinhala</MenuItem>
                <MenuItem value="Tamil">Tamil</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={handleDialogClose} variant="contained" color="primary">
              Apply
            </Button>
          </DialogContent>
        </Dialog>

        <section className="team padding">
          <div className="container grid">
            {currentItems.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
          <div className="pagination d-flex justify-center mt-5">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Team;
