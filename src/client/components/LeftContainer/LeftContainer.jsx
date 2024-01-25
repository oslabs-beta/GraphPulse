import React, { useState } from "react";
import Navbar from "./LContComponents/Navbar";
import EndPointBar from "./LContComponents/EndPointBar";
import QLogInput from './LContComponents/QLogInput';
import QLogOutput from "./LContComponents/QLogOutput";

function LeftContainer({qInput, setQInput, uri, setUri}) {
  const [endpoint, setEndpoint] = useState('');

  return (
    <div id="left-container">
      <div id="graph-pulse-header">
        <img id="graph-pulse-icon" src="../../assets/grahpqllogo.png" alt="GraphPulse Logo"/>
        <p id="project-title">GraphPulse</p>
      </div>
      <Navbar />
      <EndPointBar endpoint={endpoint} setEndpoint={setEndpoint} uri={uri} setUri={setUri}/>
      <QLogInput qInput={qInput} setQInput={setQInput}/>
      <QLogOutput />
    </div>
  );
}

export default LeftContainer;
