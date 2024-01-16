import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LeftContainer from "./LeftContainer/LeftContainer";
import RightContainer from "./RightContainer/containers/RightContainer"
import PageSignIn from "./PageSignIn";
import PageSignUp from "./PageSignUp";

import "../styles/MainContainer.css"

function AppLayout() {

    return (
        <>
            <Router>
                {/* Routes encapsulates the individual routes */}
                <Routes>
                        {/* INDIVIDUAL ROUTES GO HERE */}
                        {/* Dynamic querylogs page goes here. Might need to alter path to work (See comment example).
                        Needs element property containing respective component.*/}
                        {/* Example: <Route path='/login' element={<Login />} /> */}
                        {/* <Route exact path="/" element=
                            {
                                <div id="main-container">
                                    <LeftContainer />
                                    <RightContainer />
                                </div>
                            }
                        /> */}
                        <Route exact path="/" element={<PageSignIn />}/>
                        <Route exact path="/signup" element={<PageSignUp />}/>
                </Routes>
            </Router>
        </>
    )
}

export default AppLayout;