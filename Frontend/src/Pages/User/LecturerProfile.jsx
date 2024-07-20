import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [timetables, setTimetables] = useState([]); // Updated to an array

  useEffect(() => {
    const fetchTeacherAndTimetables = async () => {
      try {
        // Fetch teacher details
        const teacherResponse = await axios.get(`/api/teacher/profile/${id}`);
        setTeacher(teacherResponse.data);

        // Fetch timetable details
        const timetableResponse = await axios.get(`/api/timetable/display-timetable/${id}`);
        // Assuming response is an array of timetable objects
        setTimetables(timetableResponse.data);
      } catch (error) {
        console.error("Error fetching teacher details or timetables: ", error);
      }
    };

    fetchTeacherAndTimetables();
  }, [id]);

  if (!teacher || timetables.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" id="c">
      <div className="w-full p-6 bg-card text-card-foreground">
        <style>{`
          @media (max-width: 768px) {
            .flex-1 {
              width: 100%;
            } 
            #c {
              padding: 0;
              margin: 0;
            }
            .bg-black {
              padding-top: 20px;
            }
            .widget-title {
              font-size: 3rem;
            }
            .widget-subtitle {
              font-size: 2rem;
            }
            .widget-text-xl {
              font-size: 1.25rem;
            }
          }
          @media (min-width: 768px) {
            .bg-black {
              margin-top: 120px;
            }
            .widget-title {
              font-size: 4rem;
            }
            .widget-subtitle {
              font-size: 3rem;
            }
            .widget-text-xl {
              font-size: 1.5rem;
            }
          }
        `}</style>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={teacher.imageUrl}
            style={{ height: "407px" }}
            alt="Profile Picture"
            className="md:mr-6 mb-6 md:mb-0 rounded-lg"
          />
          <div className="flex-1">
            <div className="bg-black text-primary-foreground p-6 rounded-lg shadow-md w-100">
              <h2 className="text-4xl font-bold">{teacher.name}</h2>
              <br />
              <br />
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span className="mt-5 widget-text-xl">
                        <strong className="p-3">Subject </strong>
                      </span>
                    </td>
                    <td>
                      <span className="mt-5 widget-text-xl">
                        <span className="p-3">{teacher.subject} </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="mt-5 widget-text-xl">
                        <strong className="p-3">Stream </strong>
                      </span>
                    </td>
                    <td>
                      <span className="mt-5 widget-text-xl">
                        <span className="p-3">{teacher.stream} </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="mt-5 widget-text-xl">
                        <strong className="p-3">Medium </strong>
                      </span>
                    </td>
                    <td>
                      <span className="mt-5 widget-text-xl">
                        <span className="p-3">{teacher.medium.join(" / ")} </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="mt-5 widget-text-xl">
                        <strong className="p-3">Experience </strong>
                      </span>
                    </td>
                    <td>
                      <span className="mt-5 widget-text-xl">
                        <span className="p-3">{teacher.experience}</span>
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
          <h3 className="widget-subtitle font-bold">Timetables</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {timetables.map((timetable, index) => (
              <div key={index} className="bg-muted p-4 rounded-lg shadow-md">
                <p className="widget-text-xl"><strong>Class Mode:</strong> {timetable.classMode}</p>
                <p className="widget-text-xl"><strong>Medium:</strong> {timetable.medium}</p>
                <p className="widget-text-xl"><strong>Status:</strong> {timetable.status}</p>
                <p className="widget-text-xl"><strong>Note:</strong> {timetable.note}</p>
                <p className="widget-text-xl"><strong>Subject:</strong> {timetable.subject}</p>
                <p className="widget-text-xl"><strong>Name:</strong> {timetable.name}</p>
                <p className="widget-text-xl"><strong>Time:</strong> {timetable.time}</p>
                <p className="widget-text-xl"><strong>Day:</strong> {timetable.day}</p>
                <p className="widget-text-xl"><strong>Class Type:</strong> {timetable.classType}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
