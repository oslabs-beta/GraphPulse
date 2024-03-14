import React, { useState } from 'react';
import Navbar from './LContComponents/Navbar';
import EndPointBar from './LContComponents/EndPointBar';
import QLogInput from './LContComponents/QLogInput';
import QLogOutput from "./LContComponents/QLogOutput";

function LeftContainer({qInput, setQInput, setUri, results, setResults, setLatency, setDepth, isGuest, client }) {
  const [endpoint, setEndpoint] = useState('');

  return (
    <div id="left-container">
      <div id="graph-pulse-header">
      <img id="graph-pulse-icon" src="../../assets/GraphPulseLogo1.png" alt="GraphPulse Logo"/>
        <p id="project-title">GraphPulse</p>
      </div>
      <Navbar isGuest={isGuest} />
      <EndPointBar endpoint={endpoint} setEndpoint={setEndpoint} setUri={setUri}/>
      <QLogInput 
        qInput={qInput} 
        setQInput={setQInput}
        results={results}
        setResults={setResults}
        setLatency={setLatency}
        setDepth={setDepth}
        client={client}
        />
      <QLogOutput />
    </div>
  );
}

export default LeftContainer;
