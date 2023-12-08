import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LeftContainer from "./LeftContainer/LeftContainer";


function AppLayout() {

    return (
        <>
            <Router>
                {/* "Static" components like the LContainer/Navbar go outside of the routes. 
                    Maybe EndPointBar from RContainer too? */}
                    <img src="../assets/graphqlJPEG.jpg" alt="GraphPulse Logo"/>
                <h1 className="projectTitle">GraphPulse</h1>
                <LeftContainer />
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