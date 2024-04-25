import React from 'react'
import GCard from '../Gallery Card/GCard'
import Logo from '../../assets/sasip-logo.jpeg'
import './Gallery.css'
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
    const navigate = useNavigate();
    return (
        <div className="Gallery text-center container mt-5 overflow-hidden shadow-lg ">
            <h1 data-aos="zoom-in-up">[ OUR   GALLERY ]</h1>
            <div className='row justify-content-center  mt-3 p-3 w-100'>
                <div className="col-md-3 "><GCard img={Logo} path="Best Reaultt" link="" /></div>
                <div className="col-md-3 "><GCard img={Logo} path="Best Reaultt" link="" /></div>
                <div className="col-md-3 "><GCard img={Logo} path="Best Reaultt" link="" /></div>
                <div className="col-md-3 "><GCard img={Logo} path="Best Reaultt" link="" /></div>
            </div>
            <Button
              
                variant="contained"
                style={{ backgroundColor: "red", float: "right" ,marginRight: "45px" }}
                onClick={() => {
                    navigate("/about");
                }}
            >
                READ MORE
            </Button>
            <br />
        </div>
    )
}

export default Gallery
