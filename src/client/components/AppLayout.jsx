import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LeftContainer from "./LeftContainer/LeftContainer";
import RightContainer from "./RightContainer/containers/RightContainer"

function AppLayout() {

    return (
        <>
            <Router>
                <div id="main-container">
                    <LeftContainer />
                    <RightContainer />
                </div>
                <Routes>
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