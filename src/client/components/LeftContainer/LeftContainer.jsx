import React from 'react';
import Navbar from './LContComponents/Navbar';
import EndPointBar from './LContComponents/EndPointBar';
import QLogInput from './LContComponents/QLogInput';
import QLogOutput from './LContComponents/QLogOutput';

function LeftContainer({ onQueryChange, endpoint, setEndpoint, query }) {
  return (
    <div id="left-container">
      <div id="graph-p-header">
        <img
          id="graph-pulse-icon"
          src="../../assets/grahpqllogo.png"
          alt="GraphPulse Logo"
        />
        <p id="project-title">GraphPulse</p>
      </div>
      <Navbar />
      <EndPointBar endpoint={endpoint} setEndpoint={setEndpoint} />
      <QLogInput onQueryChange={onQueryChange} />
      <QLogOutput endpoint={endpoint} query={query} />
    </div>
  );
}

export default LeftContainer;
