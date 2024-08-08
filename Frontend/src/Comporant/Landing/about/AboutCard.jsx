import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { homeAbout } from "../dummydata";
import Awrapper from "./Awrapper";
import { useNavigate } from "react-router-dom";

const AboutCard = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
const navi = useNavigate();
  return (
    <>
      <section style={styles.aboutHome}>
        <div style={styles.container}>
          <div style={styles.left} data-aos="fade-right">
            <img
              src="../../../../accests/Logo/logohe.png"
              alt="Logo"
              style={styles.aboutLogo}
            />
          </div>
          <div style={styles.right} data-aos="fade-left">
            <h1 style={styles.titlem}> [ WHO WE ARE ]</h1>
            <div style={styles.items}>
              {homeAbout.map((val, index) => (
                <div style={styles.item} key={val.id || index} data-aos="fade-up">
                  <div style={styles.text}>
                    <p>
                      Sasip Educational Institute, founded in 1997 by Amith Pussalla,
                      is dedicated to providing excellent education with a focus on
                      discipline and a supportive environment. Our vision is to create
                      a well-educated, intelligent society, and our mission is to
                      develop a disciplined, good-hearted generation through systematic
                      and up-to-date practical education. Located in Nugegoda, Sri
                      Lanka, Sasip offers modern facilities, including CCTV-monitored
                      premises, clean canteens, and basic first aid services. Our
                      experienced and reputable teaching faculty, supported by a
                      well-trained staff, ensures a safe and conducive learning
                      environment. For more information, visit our websites
                      www.sasip.lk and www.sasipinstitute.com, or contact us at
                      sasip.physics@gmail.com.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button style={styles.btn} onClick={()=>{navi('/about')}}>Read More</button>
          </div>
        </div>
      </section>
    </>
  );
};

const styles = {
  aboutHome: {
    padding: "60px 0",
    backgroundColor: "#f0f4f8",
  },
  container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px", 
  },
  left: {
    flex: "1 1 300px", 
    marginBottom: "30px",
    textAlign: "center", 
  },
  aboutLogo: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
  },
  right: {
    flex: "1 1 60%", // Changed flex properties to ensure proper sizing
    padding: "30px",
    backgroundColor: "#fff",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    textAlign: "center",
    margin: "0 20px",
  },
  titlem: {
    fontSize: "2.5em",
    marginBottom: "20px",
    color: "#333",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
  },
  items: {
    marginBottom: "20px",
  },
  item: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  text: {
    fontSize: "1.1em",
    color: "#555",
    lineHeight: "1.8",
  },
  btn: {
    display: "inline-block",
    padding: "12px 30px",
    fontSize: "1em",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  btnHover: {
    backgroundColor: "#0056b3",
  },

  "@media (max-width: 768px)": {
    left: {
      flex: "1 1 100%", 
    },
    right: {
      flex: "1 1 100%", 
      margin: "0",
    },
  },

  "@media (min-width: 1200px)": {
    container: {
      flexDirection: "row",
    },
    left: {
      flex: "1 1 300px", 
      marginBottom: "0",
      textAlign: "center",
    },
    right: {
      flex: "1 1 60%", 
      margin: "0 20px",
    },
  },
};

export default AboutCard;
