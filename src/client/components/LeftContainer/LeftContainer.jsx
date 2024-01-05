import React from "react";

import Navbar from "./LContComponents/Navbar"
import EndPointBar from "./LContComponents/EndPointBar";
import QLogInput from './LContComponents/QLogInput';
import QLogOutput from "./LContComponents/QLogOutput";


function LeftContainer() {
    return (
        <div id="left-container">
            <div id="graph-pulse-header">
                <img id="graph-pulse-icon" src="../../assets/grahpqllogo.png" alt="GraphPulse Logo"/>
                <p id="projectTitle">Graph Pulse</p>
            </div>
            <Navbar />
            <QLogInput />
            <QLogOutput />
            <EndPointBar />
        </div>
    );
}

export default LeftContainer;