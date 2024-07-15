import React, {useState,useEffect } from "react";
import TeamCard from "../../Comporant/Card/TeamCard";
import "./team.css";
import { team as dummyTeamData } from "../../DummyData/dummydata";
import Heading from "../../Comporant/Landing/common/header/Header";
const Team = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [workFilter, setWorkFilter] = useState("");
  const [language, setLanguage] = useState("English");
  const [showNameSuggestions, setShowNameSuggestions] = useState(false);
  const [showWorkSuggestions, setShowWorkSuggestions] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let timer;
    const handleScroll = () => {
      setScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setScrolling(false);
      }, 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Function to filter team members
  const filteredTeam = dummyTeamData.filter((member) => {
    const nameMatches = member.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const workMatches = member.work
      .toLowerCase()
      .includes(workFilter.toLowerCase());
    return nameMatches && workMatches;
  });

  // Suggestions based on name filter
  const nameSuggestions = dummyTeamData.filter((member) =>
    member.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const workSuggestions = dummyTeamData.filter((member) =>
    member.work.toLowerCase().includes(workFilter.toLowerCase())
  );

  const handleNameSuggestionClick = (suggestion) => {
    setNameFilter(suggestion.name);
    setShowNameSuggestions(false); // Hide suggestions after selection
  };

  const handleWorkSuggestionClick = (suggestion) => {
    setWorkFilter(suggestion.work);
    setShowWorkSuggestions(false); // Hide suggestions after selection
  };

  return (
    <>
      <Heading />
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
                setShowNameSuggestions(e.target.value.length > 0); // Show suggestions if input is not empty
              }}
            />
            {showNameSuggestions && nameSuggestions.length > 0 && (
              <ul className="suggestions">
                {nameSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleNameSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="filter-input">
            <input
              type="text"
              placeholder="Filter by Work"
              value={workFilter}
              onChange={(e) => {
                setWorkFilter(e.target.value);
                setShowWorkSuggestions(e.target.value.length > 0); // Show suggestions if input is not empty
              }}
            />
            {showWorkSuggestions && workSuggestions.length > 0 && (
              <ul className="suggestions">
                {workSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleWorkSuggestionClick(suggestion)}
                  >
                    {suggestion.work}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="English">English</option>
            <option value="Sinhala">Sinhala</option>
          </select>
        </div>
      </div>

      <section className="team padding">
        <div className="container grid">
          {filteredTeam.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </section>
      </div>
    </>
  );
};

export default Team;