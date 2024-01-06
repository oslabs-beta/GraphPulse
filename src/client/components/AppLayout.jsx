import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LeftContainer from "./LeftContainer/LeftContainer";
import RightContainer from "./RightContainer/containers/RightContainer"

import "../styles/MainContainer.css"

function AppLayout() {

    return (
        <>
            <Router>
                <div id="main-container">
                    <LeftContainer />
                    <RightContainer />
                </div>
                {/* Routes encapsulates the individual routes */}
                <Routes>
                        {/* INDIVIDUAL ROUTES GO HERE */}
                        {/* Dynamic querylogs page goes here. Might need to alter path to work (See comment example).
                        Needs element property containing respective component.*/}
                        {/* Example: <Route path='/login' element={<Login />} /> */}
                        <Route path="/querylogs" />
                </Routes>
            </Router>
        </>
    )
}

export default AppLayout;