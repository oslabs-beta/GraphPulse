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
                <Routes>
                        <Route exact path="/" element={<PageSignIn />}/>
                        <Route exact path="/signup" element={<PageSignUp />}/>
                        <Route exact path="/home" element=
                            {
                                <div id="main-container">
                                    <LeftContainer />
                                    <RightContainer />
                                </div>
                            }
                        />
                </Routes>
            </Router>
        </>
    )
}

export default AppLayout;