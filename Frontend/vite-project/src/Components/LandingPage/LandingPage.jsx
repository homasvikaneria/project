// just_home/Frontend/vite-project/src/Components/LandingPage/LandingPage.jsx
import React from "react";
import { Link  , useNavigate } from "react-router-dom";
import Mainnavbar from "../Mainnav/Mainnavbar"
import './LandingPage.css'

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="mainpart">
            <Mainnavbar />

            <div className="lp-1">
                <div><img  className="lp-bgc" src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740116320/lmrzswktnauo3vjyxm1k.png" alt="" /></div>
                <div className="text-container">
                    The <span className="highlight">#1</span> site real estate <br /> professionals trust*
                </div>
                <div className="sub-text-container">
                    From as low as $10 per day with limited time offer discounts. <br />
                    <span className="yellowtext"onClick={() => navigate("/homepage")} >Browse More Properties - </span>
                </div>

                <div className="main-yellowbox">
                    <div><img className="lp-yellowbox" src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740135994/k07mrmwvtykesq2n2pg6.png" alt="" /></div>
                    <div className="stats-container">
                        <div className="stat">
                            <h2>680</h2>
                            <p>Award Winning</p>
                        </div>
                        <div className="stat">
                            <h2>8K+</h2>
                            <p>Happy Customer</p>
                        </div>
                        <div className="stat">
                            <h2>500+</h2>
                            <p>Property Ready</p>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    );
};

export default LandingPage;




